#include <DHT.h>
#include <Wire.h>
#include "RTClib.h"
#include <math.h>

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
const unsigned long period = 500; // put 1080000 for 30min
float arrayTemp[48];
int counter = 0;
float lambdaArray[30] = { 1.81, 1.87, 1.92, 1.98, 2.04, 2.11, 2.17, 2.25, 2.32, 2.40, 2.49, 2.57, 2.66, 2.76, 2.86, 2.97, 3.08, 3.20, 3.32, 3.45, 3.59, 3.73, 3.88, 4.03, 4.20, 4.36, 4.54, 4.72, 4.92, 5.11 };

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
  float liter = raining + soilWater - etp; 
  return liter;
}

void setup() {
  Serial.begin(9600);
  dht.begin();
  startMillis = millis();
  initializeArrayTemp(); 
  
  // Cloack
  Wire.begin();
  if(!rtc.begin()) {
//    log.println("RTC failed");
  #if ECHO_TO_SERIAL
    Serial.println("RTC failed");
  #endif  //ECHO_TO_SERIAL
  }

  // Set the time and date on the real time clock if necessary
  if (! rtc.isrunning()) {
    // following line sets the RTC to the date & time this sketch was compiled
    rtc.adjust(DateTime(F(__DATE__), F(__TIME__)));
  }

}

void loop() {
  
  currentMillis = millis();
  if (currentMillis - startMillis >= period) {
    // Soil moisture in %
    soilMoisturePerCent = analogRead(soilMoisturePin);
    soilMoisturePerCent = map(soilMoisturePerCent, 0, 1023, 100, 0);
     Serial.print("Soil moisture= ");
     Serial.print(soilMoisturePerCent);
     Serial.println("%");
    
    // Soil moisture sensor 
     for(int i = 0; i <= 100; i++){
       soilMoisture = soilMoisture + analogRead(soilMoisturePin);
       delay(1);
     }
     soilMoisture = soilMoisture/100.0;
     Serial.println(soilMoisture);
  
    //Temperature and air humidity sensor
    //Read data and store it to variables hum and temp
    pushValueIntoArrayTemp(dht.readTemperature());

     hum = dht.readHumidity();
     temp= dht.readTemperature();
    //Print temp and humidity values to serial monitor
     Serial.print("Humidity: ");
     Serial.print(hum);
     Serial.print(" %, Temp: ");
     Serial.print(temp);
     Serial.println(" Celsius");
     
     int test = computeAverageArrayTemp();
     Serial.println(test);
     
    //reset currentMillis
    startMillis = millis();
    currentMillis = millis();
  }
}
