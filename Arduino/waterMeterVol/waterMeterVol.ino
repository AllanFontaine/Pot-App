/*
YF‐ S201 Water Flow Sensor
Water Flow Sensor output processed to read in litres/hour
Adaptation Courtesy: www.hobbytronics.co.uk
*/
#include <Wire.h>

#define I2C_ADDRESS_OTHER 0x1
#define I2C_ADDRESS_ME 0x2

volatile int flow_frequency; // Measures flow sensor pulses
unsigned char flowsensor = 2; // Sensor Input
float vol = 0.0,l_minute;
int numValve;
float amountWater = 1.02;
String amountWaterStr = "";

void flow () // Interrupt function
{
   flow_frequency++;
}
void setup()
{
   pinMode(flowsensor, INPUT);
   digitalWrite(flowsensor, HIGH); // Optional Internal Pull-Up
   Serial.begin(9600);
   Wire.begin(I2C_ADDRESS_ME);                // join i2c bus with address #4
   Wire.onReceive(receiveEvent); // register event
   attachInterrupt(0, flow, RISING); // Setup Interrupt
}
void loop ()
{
}

void waterPlantAmout() {
     // Every second, calculate and print litres/hour
   while(vol < amountWater)
   {
      // Pulse frequency (Hz) = 7.5Q, Q is flow rate in L/min.
      l_minute = (flow_frequency / 7.5); // (Pulse frequency x 60 min) / 7.5Q = flowrate in L/hour
      l_minute = l_minute/60;
      vol = vol +l_minute;
      flow_frequency = 0;
      Serial.print(l_minute, DEC); // Print litres/hour
      Serial.println(" L/hour");
      Serial.println(vol);
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
  waterPlantAmout();
  delay(5000);
}
