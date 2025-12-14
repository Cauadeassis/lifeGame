def calculate_difficulty(income, skin_tone):
    difficulty = 3
    if income and income.get("id") == "poor":
        difficulty = 4
    elif income and income.get("id") == "rich":
        difficulty = 2
    elif income and income.get("id") == "middle":
        difficulty = 3
    if skin_tone and skin_tone.get("id") == "black":
        difficulty += 1
    elif skin_tone and skin_tone.get("id") == "white":
        difficulty -= 1
    if difficulty < 1:
        difficulty = 1
    if difficulty > 5:
        difficulty = 5
    return difficulty
