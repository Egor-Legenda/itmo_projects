n=int(input("Введите последовательность из 7 чисел(подряд): "))
a=[0]*7
x=1000000
for i in range (0,7):
    a[i]=n//x
    n=n%x
    x=x//10
error=0
for i in range (3):
    k=2**i
    num=0
    for j in range (2**i-1,7,k*2):
        for v in range (j,j+k):
            num+=a[v]
    if num%2!=0:
        error+=2**i
if a[error-1]==0:
    a[error-1]=1
else:
    a[error-1]=0
s=str(a[2])+str(a[4])+str(a[5])+str(a[6])
if error==0:
    print("Ошибок не выявлено.Правильная последовательность информационных битов: ",s)
else:
    r=[1,2,4]
    i=[3,5,6,7]
    if error==1 or error==2 or error==4:
        m="r"+str(r.index(error)+1)
    if error==3 or error==5 or error==6 or error==7:
        m="i"+str(i.index(error)+1)
    print("Ошибка была в ",m,"бите","Вот правильная последовательность: ", s)
