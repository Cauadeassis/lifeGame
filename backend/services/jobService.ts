import { getRandomItem } from "./utilities";
import { Career, Level, AssignedJob } from "../data/jobs/types";
import { Income } from "../data/character/types";
import rawCareers from "../data/jobs/careers.json";

interface GetCareersBySalaryProps {
  minimumSalary: number;
  maximumSalary: number;
}

export class JobService {
  private availableCareers: Career[];
  private salaryRangesByIncome: Record<Income["id"], { min: number; max: number }>;

  constructor() {
    this.availableCareers = rawCareers as Career[];
    this.salaryRangesByIncome = {
      poor: { min: 0, max: 3000 },
      middle: { min: 3000, max: 10000 },
      rich: { min: 10000, max: Infinity },
    };
  }

  private getInitialLevelForCareer(career: Career): Level {
    const initialLevel = career.levels[0];
    if (!initialLevel) {
      throw new Error(`Career ${career.id} has no levels defined`);
    }
    
    return initialLevel;
  }

  private getRandomYearsWorked(minimumYears: number): number {
    const additionalYears = Math.floor(Math.random() * 15);
    return minimumYears + additionalYears;
  }

  private getCurrentLevelByYears(career: Career, totalYearsWorked: number): Level {
    const sortedLevelsByYears = [...career.levels].sort((levelA, levelB) => {
      return levelB.minYears - levelA.minYears;
    });

    const currentLevel = sortedLevelsByYears.find((level) => {
      return totalYearsWorked >= level.minYears;
    });

    if (!currentLevel) {
      return this.getInitialLevelForCareer(career);
    }

    return currentLevel;
  }

  private getCareersBySalary(
    {minimumSalary, maximumSalary}: GetCareersBySalaryProps
  ): Career[] {
    const availableCareers = this.availableCareers.filter((career) => {
      const hasLevelInRange = career.levels.some((level) => {
        return (
          level.salary >= minimumSalary &&
          level.salary <= maximumSalary
        );
      });

      return hasLevelInRange;
    });

    return availableCareers;
  }

  private getSalaryRangeByIncome(income: Income): { min: number; max: number } {
    const salaryRange = this.salaryRangesByIncome[income.id];
    
    if (!salaryRange) {
      throw new Error(`Invalid income id: ${income.id}`);
    }
    
    return salaryRange;
  }

  public getRandomCareerByIncome(income: Income): AssignedJob {
    const salaryRange = this.getSalaryRangeByIncome(income);
    const availableCareers = this.getCareersBySalary({
      minimumSalary: salaryRange.min,
      maximumSalary: salaryRange.max,
    });

    if (availableCareers.length === 0) {
      throw new Error(
        `No careers found for income range ${salaryRange.min}-${salaryRange.max}`
      );
    }

    const selectedJob = getRandomItem(availableCareers);
    const initialLevel = this.getInitialLevelForCareer(selectedJob);
    const totalYearsWorked = this.getRandomYearsWorked(initialLevel.minYears);
    const currentLevel = this.getCurrentLevelByYears(selectedJob, totalYearsWorked);

    return {
      careerID: selectedJob.id,
      careerName: selectedJob.name,
      levelID: currentLevel.id,
      levelName: currentLevel.name,
      yearsWorked: totalYearsWorked,
      salary: currentLevel.salary,
    };
  }

  public getCareer(careerId: string, levelId: string): AssignedJob {
    const selectedCareer = this.getCareerById(careerId);

    if (!selectedCareer) {
      throw new Error(`Career with id "${careerId}" not found`);
    }
    const currentLevel = selectedCareer?.levels.find((level) => level.id === levelId);
    if (!currentLevel) {
      throw new Error(`Level with id "${levelId}" not found in career "${careerId}"`);
    }
    const totalYearsWorked = currentLevel.minYears;
    return {
      careerID: selectedCareer.id,
      careerName: selectedCareer.name,
      levelID: currentLevel.id,
      levelName: currentLevel.name,
      yearsWorked: totalYearsWorked,
      salary: currentLevel.salary,
    };
  }

  public getAllAvailableCareers(): Career[] {
    return [...this.availableCareers];
  }

  public getCareerById(careerId: string): Career | undefined {
    return this.availableCareers.find((career) => career.id === careerId);
  }

    public getLevelById(careerId: string, levelId: string): Level | undefined {
    const career = this.getCareerById(careerId);
    return career?.levels.find((level) => level.id === levelId);
  }
}

export default JobService;