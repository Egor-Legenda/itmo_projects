import re
f=open("Текст 2 для проверки.txt",'r',encoding="UTF-8")
a=[0]*5
for i in range(5):
    a[i]=f.readline()
f.close()
m=str(f)
def famil(n):
    fam=[]
    m=str(n)
    m=m+"  "
    while m!="":
        l=str(re.search(" ",m))
        g=(re.split(r"\D",l))
        for i in range (len(g)):
            if g[i]!="":
                sett=(int(g[i]))
        if sett+4<=len(m):
            if m[sett+1]=="." and m[0].isupper() and m[sett].isupper() and m[sett+2].isupper() and m[sett+3]=="." and re.fullmatch(r"[ ,.!]",m[sett+4]):
                fam.append(m[0:sett-1])
                m=m[(sett+4):len(m)]
            else:
                m=m[sett:len(m)]
        else:
                m=m[sett:len(m)]
    name=''
    fam.sort()
    for j in range (len(fam)):
        count=0
        for i in range (1,len(fam[j])):
            if ((re.match(r"[a-zа-яё/-]",fam[j][i]) and fam[j][i-1]!="-" and fam[j][i].lower()==fam[j][i]) or (fam[j][i-1]=="-" and re.fullmatch(r"[A-ZА-ЯЁ]",fam[j][i]))):
                count+=1
        if count==len(fam[j])-1:
            name=name+fam[j]+" "
    return name
print("1 test")
moi_otvet="Анищенко Балакшин Голованова-Иванова Машина"
print(a[0],end='')
print("Фамилии людей,которые встречаются в тексте:", famil(a[0]))
print("2 test")
moi_otvet="Иванов Петров Примеров"
print(a[1],end='')
print("Фамилии людей,которые встречаются в тексте:", famil(a[1]))
print("3 test")
moi_otvet="Ежов"
print(a[2],end='')
print("Фамилии людей,которые встречаются в тексте:", famil(a[2]))
print("4 test")
moi_otvet=""
print(a[3],end="")
print("Фамилии людей,которые встречаются в тексте:", famil(a[3]))
print("5 test")
moi_otvet="Ильина-Максик-Пятая"
print(a[4])
print("Фамилии людей,которые встречаются в тексте:", famil(a[4]))

