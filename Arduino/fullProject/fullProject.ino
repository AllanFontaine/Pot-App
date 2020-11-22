#include <DHT.h>
#include "SD.h"
#include "RTClib.h"
#include <Wire.h>

#define LOG_INTERVAL  1000
#define ECHO_TO_SERIAL   1
#define WAIT_TO_START    0
#define DHTTYPE DHT22 // DHT 22  (AM2302)

//Defining PINS
const int FlowSensorPin 2;
const int DhtPin = 7;
const int SolenoidPin = 28;
const int chipSelect = 10; // sd card



File log;
RTC_DS1307 rtc;
DateTime now;
DHT dht(DhtPin, DHTTYPE); //// Initialize DHT sensor for normal 16mhz Arduino
unsigned long currentTime;
volatile int flow_frequency;
float vol = 0.0,l_minute;
int amountparcels = 2;
float sensorValue = 0;
int chk;
float hum;  //Stores humidity value
float temp; //Stores temperature value

void error(char *str) {
  Serial.print("error: ");
  Serial.println(str);
}

void setup() {
  pinMode(FlowSensorPin, INPUT);
  pinMode(SolenoidPin, OUTPUT);
  Serial.begin(9600);
    attachInterrupt(digitalPinToInterrupt(FlowSensorPin), flow, RISING); // Setup Interrupt
    reset();
    currentTime = millis();
    dht.begin();

  // Cloack
    Wire.begin();
    if(!rtc.begin()) {
      log.println("RTC failed");
    #if ECHO_TO_SERIAL
      Serial.println("RTC failed");
    #endif  //ECHO_TO_SERIAL
    }

    // Set the time and date on the real time clock if necessary
  if (! rtc.isrunning()) {
    // following line sets the RTC to the date & time this sketch was compiled
    rtc.adjust(DateTime(F(__DATE__), F(__TIME__)));


  //SD card
  if(!SD.begin(chipSelect)) {
    error("Card failed, or not present");
  }

  Serial.println("Card initialized.");

  // create a new file
  char filename[] = "test.CSV";
  for(uint8_t i = 0; i < 100; i++) {
    filename[6] = i/10 + '0';
    filename[7] = i%10 + '0';
    if(! SD.exists(filename)) {
      // only open a new file if it doesn't exist
      logfile = SD.open(filename, FILE_WRITE);
      break;  // leave the loop!
    }
  }

  void reset(){
    int soilsensordata[amountparcels];
  }

  void flow (){
    flow_frequency++;
  }

  void loop() {

    //Probes and data collection

    for(int i = 0; i <= 100; i++){
      sensorValue = sensorValue + analogRead(ANALOGPIN0);
      delay(1);
    }
    sensorValue = sensorValue/100.0;
    Serial.println(sensorValue);
    delay(30);

    delay(2000);
    //Read data and store it to variables hum and temp
    hum = dht.readHumidity();
    temp= dht.readTemperature();
    //Print temp and humidity values to serial monitor
    Serial.print("Humidity: ");
    Serial.print(hum);
    Serial.print(" %, Temp: ");
    Serial.print(temp);
    Serial.println(" Celsius");
    //delay(10000); //Delay 2 sec.


    //Watering and amount

    if(flow_frequency != 0){
      l_minute = (flow_frequency / 7.5); // (Pulse frequency x 60 min) / 7.5Q = flowrate in L/hour
      l_minute = l_minute/60;
      vol = vol +l_minute;
      Serial.print("Vol:");
      Serial.print(vol);
      Serial.print(" L ");
      flow_frequency = 0; // Reset Counter
      Serial.print(l_minute, DEC); // Print litres/hour
      Serial.println(" L/Sec ");
      delay(1000);
    }

    // Opening and closing valve

    digitalWrite(SolenoidPin, HIGH);
    delay(1000);

  }
