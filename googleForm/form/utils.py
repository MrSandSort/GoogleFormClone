import string, random

def generateRandomCode(n):
    res= ''.join(random.choices(string.ascii_lowercase+ string.digits, k=n))
    return res
