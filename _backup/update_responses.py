import json
import random

def load_data():
    with open("responses.json", "r") as f:
        return json.load(f)

def generate_variations(templates, fillers, count=100):
    results = []
    for _ in range(count):
        t = random.choice(templates)
        kwargs = {k: random.choice(v) for k, v in fillers.items()}
        res = t.format(**kwargs) + f" [Ref: {random.randint(100, 999)}]"
        results.append(res)
    return results

data = load_data()

# Education
ed_templates = [
    "I am studying B.E. Robotics & Automation at {college} (Expected {grad}). Current standing: {cgpa}.",
    "Education: {degree} from {college}. Maintaining a {cgpa} so far.",
    "Currently at {college} pursuing {degree}, {cgpa}."
]
ed_fillers = {
    "college": ["Anna University (DACE)", "Dhaanish Ahmed College of Engineering", "DACE (Anna University)"],
    "grad": ["May 2028", "2028", "Spring 2028"],
    "degree": ["Robotics & Automation", "B.E. Robotics & Automation", "Bachelors in Robotics"],
    "cgpa": ["9.2 CGPA", "9.2/10.0 CGPA", "GPA: 9.2"]
}
data["education"] = generate_variations(ed_templates, ed_fillers)

# Experience
exp_templates = [
    "{intro} [1] ML Intern @ Tamizhan Skills, [2] AI Autonomy Intern @ Tamizhan Skills, [3] Engineering Intern @ Chennai Port Authority.",
    "Professional Experience: [1] ML Intern (RISE 3.0), [2] AI Intern (RISE 4.0), [3] Chennai Port Authority.",
    "{intro} Tamizhan Skills (ML & AI Autonomous Systems) and Chennai Port Authority."
]
exp_fillers = {
    "intro": ["My background includes:", "Internships:", "Experience record:", "Current history:"]
}
data["experience"] = generate_variations(exp_templates, exp_fillers)

# Skills
skill_templates = [
    "Core capabilities: {lang} | {fw} | {hw}",
    "Technical stack includes {lang}, {fw}, and {hw}.",
    "Skills loaded: {lang}. Frameworks: {fw}. Hardware: {hw}."
]
skill_fillers = {
    "lang": ["Python, C/C++, SQL", "C/C++, Python, SQL", "Python, SQL, Embedded C"],
    "fw": ["ROS/ROS 2, TensorFlow, OpenCV, YOLO", "ROS 2, MediaPipe, OpenCV, TensorFlow", "ROS Navigation, YOLO, TF"],
    "hw": ["ESP8266 NodeMCU, Arduino, Linux", "Linux, Arduino, Fusion 360", "NodeMCU, Linux, Hardware Design"]
}
data["skills"] = generate_variations(skill_templates, skill_fillers)

# Projects
proj_templates = [
    "Projects: {p1}, {p2}, {p3}.",
    "Portfolio highlights: {p1}, {p2}, and {p3}.",
    "Recent work includes {p1} and {p2}, along with {p3}."
]
proj_fillers = {
    "p1": ["Smart Traffic Management (SIH 2025)", "SIH 2025 Traffic Optimizer", "AI Traffic Management System"],
    "p2": ["Real-Time Object Detection Engine", "YOLO Vision Pipeline", "High-speed Object Tracking Engine"],
    "p3": ["ROS Autonomous Navigation Stack", "ROS 2 SLAM Robot", "Smart Mechatronics Controller"]
}
data["projects"] = generate_variations(proj_templates, proj_fillers)

# Contact
contact_templates = [
    "Email: {email} | Phone: {phone} | Location: Chennai.",
    "Reach me at {email} or call {phone}.",
    "Comm channel open: {email}, {phone} (Chennai, India)."
]
contact_fillers = {
    "email": ["<span class=\"txt-cyan\">deepak121289@outlook.com</span>", "<span class=\"txt-cyan\">deepak@robotics</span>"],
    "phone": ["<span class=\"txt-green\">+91 63696 14424</span>", "<span class=\"txt-green\">(+91) 6369614424</span>"]
}
data["contact"] = generate_variations(contact_templates, contact_fillers)

# Ping
ping_templates = [
    "Pinging deepak.robotics.internal [127.0.0.1]: 64 bytes, <span class=\"txt-green\">time={t}ms</span>. TTL=64",
    "Reply from 127.0.0.1: bytes=64 time=<span class=\"txt-green\">{t}ms</span> TTL=64",
    "64 bytes from localhost: icmp_seq=1 ttl=64 time=<span class=\"txt-green\">{t}ms</span>"
]
ping_fillers = {
    "t": ["1.2", "1.8", "2.4", "0.9", "3.1", "1.5"]
}
data["ping"] = generate_variations(ping_templates, ping_fillers)

with open("responses.json", "w") as f:
    json.dump(data, f, indent=4)
