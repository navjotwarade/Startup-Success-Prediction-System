library(plyr)
library(ggplot2)
library(xtable)
library(gridExtra)
library(maps)
library(mapdata)
library(mapproj)
library(maptools)
library(ggmap)
library(sp)
library(stringr)
library(ggsubplot)
library(reshape2)
library(taRifx)
library(XML)
library(quantmod)
library(PerformanceAnalytics)
investments <- read.csv("./allDir/investment.csv", header=TRUE, stringsAsFactors = F)
companies <- read.csv("./allDir/company.csv", header=TRUE, stringsAsFactors = F)
##ind.na = which(companies[,"category_code"] == "")
##companies$category_code[ind.na] = "Others"
rounds <- read.csv("./allDir/rounds.csv", header=TRUE, stringsAsFactors = F)
acquisition <- read.csv("./allDir/acquisition.csv", header=TRUE, stringsAsFactors = F)
addition <- read.csv("./allDir/addition.csv", header=TRUE, stringsAsFactor = F)

## line plot investment vs time

investments <- unique(investments)
investments$investor_type = sapply(strsplit(investments$investor_permalink,"/"), "[", 2)
unique(investments$investor_type)
##invest.cate <- subset(investments, investor_category_code != "" & comapany_name != "Army & Air Force Exchange Service")
invest.status <- ddply(investments,.(investor_type), summarize, sum_funds= sum(as.numeric(raised_amount_usd), na.rm = T), num_invest = length(investor_type))
invest.status <- arrange(invest.status, desc(sum_funds))
xtable(invest.status)

invest.status <- ddply(investments,.(funded_year), summarize, sum_funds= sum(as.numeric(raised_amount_usd), na.rm = T), startup.num = length(funded_year))
invest.status$sum_funds = invest.status$sum_funds / 1E7
png(file = "plot.jpg")
p <- ggplot(invest.status, aes(x = funded_year, y = sum_funds, color = startup.num, 1))+
  xlim(1987,2014)+
  geom_line(size = 2)+
  geom_point()+
  theme(panel.background = element_blank(), text = element_text(size = 15), axis.line = element_line(size = 0.8, colour = "grey75"))+
  scale_color_gradient ( limits= c(0 , 10000 ) , high ="red" , low = "blue", name = "Startup Number")+
  labs(x= "Years from 1987 to 2015", y = "investmenst in USD")+
  ggtitle("Trends of Investments v/s Years")
ggsave(filename = "./public/img/ab.jpg", plot = p)
dev.off()
                         
                         