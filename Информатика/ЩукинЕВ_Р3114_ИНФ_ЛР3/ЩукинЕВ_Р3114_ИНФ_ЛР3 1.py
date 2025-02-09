import re
import random
f=open("Текст 1 для проверки.txt",'r',encoding="UTF-8")
a=[0]*4
for i in range(4):
    a[i]=f.readline()
f.close()
def vozvrat(stroka):
    """ Возвращает кол-вот смайликов вида 409929%6=3(8)
        409929%4=1(<)
        409929%7=2(O) """
    smalik=r"8<O"
    return len(re.findall(smalik,stroka))

print("1 test")
moi_otvet=5
print(a[0])
print("Смайлик 8<O встречается ", vozvrat(a[0])," раз")
print("2 test")
b=["8","<","O"]
a1=""
for i in range (50):
    a1+=b[int(random.uniform(0,2.99))]
print(a1)
print("Смайлик 8<O встречается ", vozvrat(a1)," раз")
print("3 test")
moi_otvet=1
print(a[1])
print("Смайлик 8<O встречается ", vozvrat(a[1])," раз")
print("4 test")
moi_otvet=0
print(a[2])
print("Смайлик 8<O встречается ", vozvrat(a[2])," раз")
print("5 test")
moi_otvet=2
print(a[3])
print("Смайлик 8<O встречается ", vozvrat(a[3])," раз")
