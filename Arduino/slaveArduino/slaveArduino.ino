/*
YF‐ S201 Water Flow Sensor
Water Flow Sensor output processed to read in litres/hour
Adaptation Courtesy: hobbytronics.co.uk
*/

#include <Wire.h>

#define I2C_ADDRESS_OTHER 0x1
#define I2C_ADDRESS_ME 0x2

#define VALVEPIN1 3  //4 ok
#define VALVEPIN2 4
#define VALVEPIN3 5
#define VALVEPIN4 6
#define VALVEPIN5 7
#define VALVEPIN6 8

#define NOT_AN_INTERRUPT -1


volatile int flow_frequency; // Measures flow sensor pulses
// Calculated litres/hour
float vol = 0.0,l_minute;
unsigned char flowsensor = 2; // Sensor Input
int numValve;
float amountWater;
String amountWaterStr = "";



void setup() {
   Serial.begin(9600);
   pinMode(VALVEPIN1, OUTPUT);
   pinMode(flowsensor, INPUT);
   digitalWrite(flowsensor, HIGH); // Optional Internal Pull-Up
   Wire.begin(I2C_ADDRESS_ME);     // join i2c bus with address #4
   Wire.onReceive(receiveEvent); // register event
   attachInterrupt(digitalPinToInterrupt(flowsensor), flow, RISING); // Setup Interrupt
}

void loop () {
  if(amountWater != 0) {
    switch (numValve) {
    case 1:
      Serial.println("Debut de l'arrosage");
      digitalWrite(VALVEPIN1, HIGH);
      waterPlantAmout();
      Serial.println("fin de l'arrosage");
      digitalWrite(VALVEPIN1, LOW);
      sendToMaster(9);
    break;
    case 2:
      Serial.println("Debut de l'arrosage");
      digitalWrite(VALVEPIN2, HIGH);
      waterPlantAmout();
      Serial.println("fin de l'arrosage");
      digitalWrite(VALVEPIN2, LOW);
      sendToMaster(9);
    break;
    case 3:
      Serial.println("Debut de l'arrosage");
      digitalWrite(VALVEPIN3, HIGH);
      waterPlantAmout();
      Serial.println("fin de l'arrosage");
      digitalWrite(VALVEPIN3, LOW);
      sendToMaster(9);
    break;
    case 4:
      Serial.println("Debut de l'arrosage");
      digitalWrite(VALVEPIN4, HIGH);
      waterPlantAmout();
      Serial.println("fin de l'arrosage");
      digitalWrite(VALVEPIN4, LOW);
      sendToMaster(9);
    break;
    case 5:
      Serial.println("Debut de l'arrosage");
      digitalWrite(VALVEPIN5, HIGH);
      waterPlantAmout();
      Serial.println("fin de l'arrosage");
      digitalWrite(VALVEPIN5, LOW);
      sendToMaster(9);
    break;
    case 6:
      Serial.println("Debut de l'arrosage");
      digitalWrite(VALVEPIN6, HIGH);
      waterPlantAmout();
      Serial.println("fin de l'arrosage");
      digitalWrite(VALVEPIN6, LOW);
      sendToMaster(9);
    break;
    } 
  }
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
}

void waterPlantAmout(){      
  flow_frequency = 0;
  while(vol < amountWater){
    // Pulse frequency (Hz) = 7.5Q, Q is flow rate in L/min.
    l_minute = (flow_frequency / 7.5); // (Pulse frequency x 60 min) / 7.5Q = flowrate in L/hour
    l_minute = l_minute/60;
    vol = vol +l_minute;
    Serial.print("Vol:");
    Serial.print(vol);
    Serial.print(" L ");
    flow_frequency = 0; // Reset Counter
    Serial.print(l_minute, DEC); // Print litres/hour
    Serial.println(" L/Sec ");
  }
  vol = 0;
  amountWater = 0;
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
