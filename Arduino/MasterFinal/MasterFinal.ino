#include <DHT.h>
#include <Wire.h>
#include "RTClib.h"
#include <math.h>
#include <stdlib.h>

#define DHTTYPE DHT22 // temp/moisture sensor
#define ECHO_TO_SERIAL   1

//Defining PINS
const int dhtPin = 7;
const int soilMoisturePin = A0;

DHT dht(dhtPin, DHTTYPE);
RTC_DS1307 rtc;
DateTime now;
uint16_t soilMoisturePerCent;
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
  if (currentMillis - startMillis >= period) {
    // Soil moisture in %
    soilMoisturePerCent = analogRead(soilMoisturePin);
    soilMoisturePerCent = map(soilMoisturePerCent, 0, 1023, 100, 0);
    // Serial.print("Soil moisture= ");
    // Serial.print(soilMoisturePerCent);
    // Serial.println("%");
    
    // Soil moisture sensor 
     for(int i = 0; i <= 100; i++){
       soilMoisture = soilMoisture + analogRead(soilMoisturePin);
       delay(1);
     }
     soilMoisture = soilMoisture/100.0;
    // Serial.println(soilMoisture);
  
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
    liter = computeLiterNeeded(0.14, determineSoilWater(soilMoisturePerCent), lambdaValue);
    Serial.println(soilMoisturePerCent);
    Serial.println(determineSoilWater(soilMoisturePerCent), 3);
    Serial.println(liter);
    //sendToSlave(1, liter);

     
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
