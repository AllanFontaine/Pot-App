/*
YF‐ S201 Water Flow Sensor
Water Flow Sensor output processed to read in litres/hour
Adaptation Courtesy: hobbytronics.co.uk
*/

#include <Wire.h>

#define VALVEPIN1 2
#define VALVEPIN2 3
#define VALVEPIN3 4
#define VALVEPIN4 5
#define VALVEPIN5 6
#define VALVEPIN6 7
#define NOT_AN_INTERRUPT -1

volatile int flow_frequency = 1; // Measures flow sensor pulses
// Calculated litres/hour
 float vol = 0.0,l_minute;
 #define flowsensor 2 // Sensor Input
unsigned long currentTime;
unsigned long cloopTime;
int numValve;
float amountWater;
String amountWaterStr;

void flow () { // Interrupt function 
   flow_frequency++;
}
void setup() {
   pinMode(flowsensor, INPUT);
   digitalWrite(flowsensor, HIGH); // Optional Internal Pull-Up
   Wire.begin(4);                // join i2c bus with address #4
   Wire.onReceive(receiveEvent); // register event
   Serial.begin(9600);
   attachInterrupt(digitalPinToInterrupt(flowsensor), flow, RISING); // Setup Interrupt

 
   Serial.print("Water Flow Meter");
   Serial.print("Circuit Digest");
   currentTime = millis();
   cloopTime = currentTime;
}
void loop () {
   currentTime = millis();
   // Every second, calculate and print litres/hour
   receiveEvent();
}

void receiveEvent() {
//  numValve = 1;
//  amountWater = 2.00;
  while(1 < Wire.available()) { // loop through all but the last
    amountWaterStr = Wire.read();    // receive byte as an integer
    Serial.println(amountWaterStr);
    //amountWater = amountWaterStr.toFloat();
    //Serial.println(amountWater);

 }
    numValve = Wire.read(); // receive byte as a character
    Serial.print(numValve);         // print the character
    
    switch (numValve) {
    case 1:
    Serial.println("Debut de l'arrosage");
    digitalWrite(VALVEPIN1, HIGH);
    waterPlantAmout();
    vol = 0;
    Serial.println("fin de l'arrosage");
    digitalWrite(VALVEPIN1, LOW);
    break;
    case 2:

    break;
    case 3:

    break;
    case 4:

    break;
    default:
    Serial.print("No data number");
    break;
}
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
      flow_frequency = 0; // Reset Counter
      Serial.print(l_minute, DEC); // Print litres/hour
      Serial.println(" L/Sec ");
      delay(1000);
   }
  }
  }
