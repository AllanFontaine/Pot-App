#include <DHT.h>
#include <Wire.h>
#include "RTClib.h"

#define DHTTYPE DHT22 // temp/moisture sensor
#define ECHO_TO_SERIAL   1

//Defining PINS
const int dhtPin = 7;
const int soilMoisturePin = A0;

DHT dht(dhtPin, DHTTYPE);
RTC_DS1307 rtc;
DateTime now;
float soilMoisture = 0;
float hum = 0;
float temp = 0;
unsigned long startMillis;
unsigned long currentMillis;
const unsigned long period = 4000; // put 1080000 for 30min

void error(char *str) {
  Serial.print("error: ");
  Serial.println(str);
}

void setup() {
  Serial.begin(9600);
  dht.begin();
  startMillis = millis();
  
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
    // Soil moiture sensor 
    for(int i = 0; i <= 100; i++){
      soilMoisture = soilMoisture + analogRead(soilMoisturePin);
      delay(1);
    }
    soilMoisture = soilMoisture/100.0;
    Serial.println(soilMoisture);
  
    //Temperature and air humidity sensor
    //Read data and store it to variables hum and temp
    hum = dht.readHumidity();
    temp= dht.readTemperature();
    //Print temp and humidity values to serial monitor
    Serial.print("Humidity: ");
    Serial.print(hum);
    Serial.print(" %, Temp: ");
    Serial.print(temp);
    Serial.println(" Celsius");

    //reset currentMillis
    startMillis = millis();
    currentMillis = millis();
  }
}
