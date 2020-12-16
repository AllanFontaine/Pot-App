// Wire Master Writer
// by Nicholas Zambetti <http://www.zambetti.com>

// Demonstrates use of the Wire library
// Writes data to an I2C/TWI slave device
// Refer to the "Wire Slave Receiver" example for use with this

// Created 29 March 2006

// This example code is in the public domain.


#include <Wire.h>
#include <stdlib.h>

float test = 3.15;
char test1[8];

void setup()
{
  Wire.begin(); // join i2c bus (address optional for master)
}

byte x = 1;

void loop()
{
  dtostrf(test, 8, 2, test1);
  Wire.beginTransmission(20); // transmit to device #4
  Wire.write(test1);        // sends five bytes
  Wire.write(x);            // sends one byte  
  Wire.endTransmission();    // stop transmitting


 // x++;
  delay(500);
}
