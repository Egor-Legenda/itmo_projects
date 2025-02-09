import seaborn as sb
import pandas as pd
import matplotlib.pyplot as plt
#чтение файла csv библиотека pandas
dataFrame = pd.read_csv('SPFB.RTS-12.18_180901_181231.csv')
print(dataFrame)
ExchangeData = [[[], [], [], []] for i in range(4)]
kolvo = {0:0, 1:0, 2:0, 3:0}
#роходим по дате и считаем сколько раз встретилась какая и записываем в словарь
for i in dataFrame['<DATE>']:
    if i == '03/09/18':
        kolvo[0] += 1
    if i == '03/10/18':
        kolvo[1] += 1
    if i == '06/11/18':
        kolvo[2] += 1
    if i == '03/12/18':
        kolvo[3] += 1
#дальше через while проходим по зааписанным данным из csv  и закидываем в общий

counter = 0
while counter < kolvo[0]:
    ExchangeData[0][0] += [dataFrame['<OPEN>'][counter]]
    ExchangeData[0][1] += [dataFrame['<CLOSE>'][counter]]
    ExchangeData[0][2] += [dataFrame['<HIGH>'][counter]]
    ExchangeData[0][3] += [dataFrame['<LOW>'][counter]]
    counter += 1

while counter < kolvo[1] + kolvo[0]:
    ExchangeData[1][0] += [dataFrame['<OPEN>'][counter]]
    ExchangeData[1][1] += [dataFrame['<CLOSE>'][counter]]
    ExchangeData[1][2] += [dataFrame['<HIGH>'][counter]]
    ExchangeData[1][3] += [dataFrame['<LOW>'][counter]]
    counter += 1

while counter < kolvo[2] + kolvo[1] + kolvo[0]:
    ExchangeData[2][0] += [dataFrame['<OPEN>'][counter]]
    ExchangeData[2][1] += [dataFrame['<CLOSE>'][counter]]
    ExchangeData[2][2] += [dataFrame['<HIGH>'][counter]]
    ExchangeData[2][3] += [dataFrame['<LOW>'][counter]]
    counter += 1

while counter < kolvo[3] + kolvo[2] + kolvo[1] + kolvo[0]:
    ExchangeData[3][0] += [dataFrame['<OPEN>'][counter]]
    ExchangeData[3][1] += [dataFrame['<CLOSE>'][counter]]
    ExchangeData[3][2] += [dataFrame['<HIGH>'][counter]]
    ExchangeData[3][3] += [dataFrame['<LOW>'][counter]]
    counter += 1

#оздаем диаграмму по уже записанным даннымм
sb.boxplot([*ExchangeData[0], *ExchangeData[1], *ExchangeData[2], *ExchangeData[3]])
# подписываем оси,
plt.ylabel("Финансы")
plt.xticks([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], ['\n\nOPEN\n', 'CLOSE\n03/09/18', '\n\nHIGH\n', 'LOW\n', '\n\nOPEN\n', 'CLOSE\n03/10/18', '\n\nHIGH\n', 'LOW\n', '\n\nOPEN\n', 'CLOSE\n06/11/18', '\n\nHIGH\n', 'LOW\n', '\n\nOPEN\n', 'CLOSE\n03/12/18', '\n\nHIGH\n', 'LOW\n'])
#ывод на дисплей
plt.show()
