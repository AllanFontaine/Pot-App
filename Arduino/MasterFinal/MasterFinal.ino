#include <DHT.h>
#include <Wire.h>
#include "RTClib.h"
#include <math.h>
#include <stdlib.h>

#define DHTTYPE DHT22 // temp/moisture sensor
#define ECHO_TO_SERIAL   1

//Defining PINS
const int dhtPin = 7;
const int soilMoisturePin0 = A0;
const int soilMoisturePin1 = A1;
const int soilMoisturePin2 = A2;
const int soilMoisturePin3 = A3;
const int soilMoisturePin4 = A4;
const int soilMoisturePin5 = A5;
const int threshold = 55;


DHT dht(dhtPin, DHTTYPE);
RTC_DS1307 rtc;
DateTime now;
uint16_t soilMoisturePerCent[6];
float soilMoisture;
float hum;
float temp;
unsigned long startMillis;
unsigned long currentMillis;
const unsigned long period = 4000; // put 1080000 for 30min
float arrayTemp[48];
int counter = 0;
float lambdaArray[30] = { 1.81, 1.87, 1.92, 1.98, 2.04, 2.11, 2.17, 2.25, 2.32, 2.40, 2.49, 2.57, 2.66, 2.76, 2.86, 2.97, 3.08, 3.20, 3.32, 3.45, 3.59, 3.73, 3.88, 4.03, 4.20, 4.36, 4.54, 4.72, 4.92, 5.11 };
float lambdaValue;
int averageTemp;
float liter;
char strLiter[8];
boolean wateringInProcess = false;



void error(char *str) {
  Serial.print("error: ");
  Serial.println(str);
}

void initializeArrayTemp() {
  for (int i= 0; i < 48; i++) {
    arrayTemp[i] = 0;
  }
}

void pushValueIntoArrayTemp(float temp) {
  arrayTemp[counter] = temp;
  counter++;
  if(counter > 47) {
    counter = 0;
  }
}

int computeAverageArrayTemp() {
  float total = 0;
  int mean = 0;
  for(int i = 0; i < 48; i++) {
    total = total + arrayTemp[i];
  }
  mean = round(total/48);
  return mean;
}

float associateLambdaValue(int index) {
   float lambda = lambdaArray[index];
   return lambda;
}

float computeLiterNeeded(float raining, float soilWater, float lambda) {
  float etp = 0.37 * lambda;
  float liter = etp - raining - soilWater; 
  return liter;
}

//void sendToSlave(byte numPin, float liter) {
//  char strLiter[8];
//  dtostrf(liter, 8, 2, strLiter);
//  Wire.beginTransmission(4);
//  Wire.write(strLiter);
//  Wire.write(numPin);
//  Serial.println(numPin);
//  Wire.endTransmission();
//  wateringInProcess = true;
//}

int wateringPriority() {
  int index;
  uint16_t minValue = 101;  
  for(int i = 0; i < 6; i++) {
    if(soilMoisturePerCent[i] < minValue) {
      index = i;
      minValue = soilMoisturePerCent[i];
    }
  }
  return index;
}

void setup() {
  Serial.begin(9600);
  dht.begin();
  Wire.begin();
  startMillis = millis();
  initializeArrayTemp();

  // Cloack
 // if(!rtc.begin()) {
//    log.println("RTC failed");

  //#if ECHO_TO_SERIAL
   // Serial.println("RTC failed");
  //#endif  //ECHO_TO_SERIAL
 // }
    

  // Set the time and date on the real time clock if necessary
  //if (! rtc.isrunning()) {
    // following line sets the RTC to the date & time this sketch was compiled
    //rtc.adjust(DateTime(F(__DATE__), F(__TIME__)));
  //}
}

void loop() {
  currentMillis = millis();
  if(currentMillis - startMillis >= period) {   
    
    // Soil moisture in %
    
    soilMoisturePerCent[0] = analogRead(soilMoisturePin0);
    soilMoisturePerCent[0] = map(soilMoisturePerCent[0], 0, 1023, 100, 0);
    
    soilMoisturePerCent[1] = analogRead(soilMoisturePin1);
    soilMoisturePerCent[1] = map(soilMoisturePerCent[1], 0, 1023, 100, 0);

    soilMoisturePerCent[2] = analogRead(soilMoisturePin2);
    soilMoisturePerCent[2] = map(soilMoisturePerCent[2], 0, 1023, 100, 0);

    soilMoisturePerCent[3] = analogRead(soilMoisturePin3);
    soilMoisturePerCent[3] = map(soilMoisturePerCent[3], 0, 1023, 100, 0);

    soilMoisturePerCent[4] = analogRead(soilMoisturePin4);
    soilMoisturePerCent[4] = map(soilMoisturePerCent[4], 0, 1023, 100, 0);

    soilMoisturePerCent[5] = analogRead(soilMoisturePin5);
    soilMoisturePerCent[5] = map(soilMoisturePerCent[5], 0, 1023, 100, 0);
    
    //Temperature and air humidity sensor
    //Read data and store it to variables hum and temp  
     hum = dht.readHumidity();
     temp= dht.readTemperature();
    //Print temp and humidity values to serial monitor
     //Serial.print("Humidity: ");
     //Serial.print(hum);
     //Serial.print(" %, Temp: ");
     //Serial.print(temp);
     //Serial.println(" Celsius");

    //Compute the watering
    pushValueIntoArrayTemp(dht.readTemperature());
    averageTemp = computeAverageArrayTemp();
    lambdaValue = associateLambdaValue(averageTemp);
    liter = computeLiterNeeded(0.14, determineSoilWater(soilMoisturePerCent[wateringPriority()]), lambdaValue);
    for (int i = 0; i < 6; i++) {
      Serial.println(soilMoisturePerCent[i]);
    }
    Serial.print("priority index = ");
    Serial.println(wateringPriority());
    Serial.println(determineSoilWater(soilMoisturePerCent[wateringPriority()]), 3);
    Serial.println(liter);
    if(soilMoisturePerCent[wateringPriority()] < threshold && wateringInProcess == false) {
      //sendToSlave(wateringPriority() + 1, liter);
      wateringInProcess = true;
    }
    

     
    //reset currentMillis
    startMillis = millis();
    currentMillis = millis();
  }
}

float determineSoilWater(uint16_t soilHumidity) {
  if(soilHumidity >= 0 && soilHumidity <= 20) {
      return 0;
  } else if(soilHumidity >= 21 && soilHumidity <= 30) {
      return 0.005;
  } else if(soilHumidity >= 31 && soilHumidity <= 40) {
      return 0.007;
  } else if(soilHumidity >= 41 && soilHumidity <= 45) {
      return 0.009;
  } else if(soilHumidity >= 46 && soilHumidity <= 50) {
      return 0.011;
  } else if(soilHumidity >= 51 && soilHumidity <= 55) {
      return 0.012;
  } else if(soilHumidity >= 56 && soilHumidity <= 60) {
      return 0.013;
  } else if(soilHumidity >= 61 && soilHumidity <= 65) {
      return 0.014;
  } else if(soilHumidity >= 66 && soilHumidity <= 75) {
      return 0.015;
  } else if(soilHumidity >= 76 && soilHumidity <= 100) {
      return 0.023;
  } else {
      return -1;
  }
}
