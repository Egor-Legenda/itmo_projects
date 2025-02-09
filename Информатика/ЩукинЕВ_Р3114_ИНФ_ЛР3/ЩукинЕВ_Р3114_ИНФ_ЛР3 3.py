import re
def Laba(stroka,buk1,buk2,buk3,cif):
    stroka=" "+stroka+ " "
    Slovo=""
    mas=re.split(" ",stroka)
    for i in range (len(mas)):
        col=0
        mol=0
        for j in range (1,len(mas[i])-1):
            if mas[i][0]==buk1 and mas[i][(int((len(mas[i])-1)/2))]==buk2 and mas[i][int(len(mas[i])-1)]==buk3 and len(mas[i])==int(cif*2+3):
                if j!=int((len(mas[i])-1)/2):
                    if (str(mas[i][j]).lower())!=buk1.lower() and (str(mas[i][j]).lower())!=buk2.lower() and (str(mas[i][j]).lower())!=buk3.lower()and re.fullmatch(r"[a-zа-яА-ЯA-ZёЁ]",mas[i][j]):
                        mol+=1
                    else:
                        col+=1
            else:
                break
        if mol==cif*2 and col==0:
            Slovo=Slovo+" "+str(mas[i])
    return Slovo
                                
print("1 test")
g1=" КоРмА КоРкА КоРчмА"
d1=1
a1="К"
b1='Р'
c1='А'
print(g1)
print("Маске соответствуют слова: ", Laba(g1,a1,b1,c1,d1))
moi_otvet="КоРмА"
print("2 test")
g2="обрикос обриквс обриикос о..б..с"
d2=2
a2="о"
b2='и'
c2='с'
print(g2)
print("Маске соответствуют слова: ", Laba(g2,a2,b2,c2,d2))
moi_otvet="обриквс"
print("3 test")
g3="космос9 Колмогс кримбос к90мбос кМиморс корморс"
d3=2
a3="к"
b3='м'
c3='с'
print(g3)
print("Маске соответствуют слова: ", Laba(g3,a3,b3,c3,d3))
moi_otvet="кримбос корморс"
print("4 test")
g4="Ambaf ambaf ambof"
d4=1
a4="a"
b4='b'
c4='f'
print(g4)
print("Маске соответствуют слова: ", Laba(g4,a4,b4,c4,d4))
moi_otvet="ambof"
print("5 test")
g5="domgkomhl dDiokghtl"
d5=3
a5="d"
b5='k'
c5='l'
print(g5)
print("Маске соответствуют слова: ", Laba(g5,a5,b5,c5,d5))
moi_otvet="domgkomhl"
