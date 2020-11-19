/* 
  Soil Moisture Sensor  
  modified on 21 Feb 2019 
  by Saeed Hosseini @ Electropeak 
  https://electropeak.com/learn/ 
*/
#define AnalogPin0 A0 

 float sensorValue = 0; 
void setup() { 
  Serial.begin(9600); 
} 
void loop() { 
  for (int i = 0; i <= 100; i++) 
  { 
    sensorValue = sensorValue + analogRead(AnalogPin0); 
    delay(1); 
  } 
  sensorValue = sensorValue/100.0; 
  Serial.println(sensorValue); 
  delay(30); 

}
