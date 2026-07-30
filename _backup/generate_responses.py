import json
import random

whoami_templates = [
    "I am Deepak R, {} pursuing Robotics & Automation (9.2 CGPA).",
    "Deepak R here! I'm a {} with a passion for robotics.",
    "You've reached Deepak R, a {} specializing in ROS 2 and AI.",
    "System Identifier: Deepak R. Role: {}. Location: Chennai.",
    "I'm Deepak, {} focusing on embedded systems and computer vision."
]
adjectives = ["dedicated student", "tech enthusiast", "future roboticist", "autonomous systems architect", "passionate engineer", "creative problem solver", "robotics developer"]

whoami_responses = []
for _ in range(100):
    t = random.choice(whoami_templates)
    a = random.choice(adjectives)
    whoami_responses.append(t.format(a))

unknown_responses = []
for i in range(100):
    unknown_responses.append(f"AI Core [Seq {i}]: Input not recognized. Try 'help'.")

data = {
    "whoami": list(set(whoami_responses)), # Just taking unique ones, though there might be around 35 unique
    "unknown": unknown_responses
}

# Let's make sure we have exactly 100 whoami by slightly varying them
whoami_list = []
for i in range(100):
    t = random.choice(whoami_templates)
    a = random.choice(adjectives)
    whoami_list.append(t.format(a) + f" [Hash: {random.randint(1000, 9999)}]")

with open("responses.json", "w") as f:
    json.dump({
        "whoami": whoami_list,
        "unknown": [
            "Does not compute. Please use standard commands.",
            "I'm a portfolio AI, not a chat bot! Try 'help'.",
            "Error 404: Logic not found in current neural pathways.",
            "My sensors indicate you typed gibberish.",
            "Processing... Result: Unknown command."
        ] * 20
    }, f, indent=4)
