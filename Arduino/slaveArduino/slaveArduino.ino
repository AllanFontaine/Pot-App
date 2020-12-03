/*
YF‐ S201 Water Flow Sensor
Water Flow Sensor output processed to read in litres/hour
Adaptation Courtesy: hobbytronics.co.uk
*/

#include <Wire.h>

#define I2C_ADDRESS_OTHER 0x1
#define I2C_ADDRESS_ME 0x2

#define VALVEPIN1 4
#define VALVEPIN2 3
#define VALVEPIN3 0
#define VALVEPIN4 5
#define VALVEPIN5 6
#define VALVEPIN6 7

#define NOT_AN_INTERRUPT -1


volatile int flow_frequency= 1; // Measures flow sensor pulses
// Calculated litres/hour
float vol = 0.0,l_minute;
unsigned long currentTime;
unsigned long cloopTime;
int numValve;
float amountWater;
String amountWaterStr = "";
unsigned char flowsensor = 12; // Sensor Input


void setup() {
   Serial.begin(9600);
   pinMode(VALVEPIN1, OUTPUT);
   pinMode(flowsensor, INPUT);
   digitalWrite(flowsensor, HIGH); // Optional Internal Pull-Up
   Wire.begin(I2C_ADDRESS_ME);                // join i2c bus with address #4
   Wire.onReceive(receiveEvent); // register event
   attachInterrupt(digitalPinToInterrupt(flowsensor), flow, RISING); // Setup Interrupt
   Serial.println("Water Flow Meter");
   Serial.println("Circuit Digest");
}

void loop () {
delay(1000);
digitalWrite(VALVEPIN1, LOW);
}

void receiveEvent() {
  while(1 < Wire.available()) { // loop through all but the last
    char c = Wire.read();
    //Serial.print(c);
    amountWaterStr = amountWaterStr + c;    // receive byte as an integer
  }
  
  numValve = Wire.read(); // receive byte as a character
  amountWater = amountWaterStr.toFloat();
  Serial.println(numValve);
  Serial.println(amountWater);
  delay(5000);
  

  switch (numValve) {
  case 1:
    Serial.println("Debut de l'arrosage");
    digitalWrite(VALVEPIN1, HIGH);
    waterPlantAmout();
    vol = 0;
    Serial.println("fin de l'arrosage");
    digitalWrite(VALVEPIN1, LOW);
    delay(1000);
    //sendToMaster(9);
  break;
  case 2:
  break;
  case 3:
  break;
  case 4:
  break;
  case 6:
    
  break;
  } //sendToMaster();
}

void waterPlantAmout(){
  while(vol < amountWater){
    if(flow_frequency != 0){
    // Pulse frequency (Hz) = 7.5Q, Q is flow rate in L/min.
    l_minute = (flow_frequency / 7.5); // (Pulse frequency x 60 min) / 7.5Q = flowrate in L/hour
    l_minute = l_minute/60;
    vol = vol +l_minute;
    Serial.print("Vol:");
    Serial.print(vol);
    Serial.print(" L ");
    flow_frequency = 1; // Reset Counter
    Serial.print(l_minute, DEC); // Print litres/hour
    Serial.println(" L/Sec ");
    delay(1000);
    }
  }
}

void sendToMaster(byte answer){
 Wire.beginTransmission(I2C_ADDRESS_OTHER);
  Wire.write(answer); 
  Serial.println(answer);
 Wire.endTransmission();
}

void flow () { // Interrupt function 
   flow_frequency++;
}
