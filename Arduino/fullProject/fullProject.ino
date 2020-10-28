#include <DHT.h>

#define FLOWSENSORPIN 2  //Defininig a pin
#define DHTPIN 7
#define ANALOGPIN0 A0
#define DHTTYPE DHT22   // DHT 22  (AM2302)
#define SOLENOIDPIN 4



DHT dht(DHTPIN, DHTTYPE); //// Initialize DHT sensor for normal 16mhz Arduino
unsigned long currentTime;
volatile int flow_frequency;
float vol = 0.0,l_minute;
int amountparcels = 2;
float sensorValue = 0;
int chk;
float hum;  //Stores humidity value
float temp; //Stores temperature value



void setup() {
  pinMode(FLOWSENSORPIN, INPUT);
  pinMode(SOLENOIDPIN, OUTPUT);
  Serial.begin(9600);
    attachInterrupt(digitalPinToInterrupt(FLOWSENSORPIN), flow, RISING); // Setup Interrupt
    reset();
    currentTime = millis();
    dht.begin();
  }

  void reset(){
    int soilsensordata[amountparcels];
  }

  void flow (){
    flow_frequency++;
  }

  void loop() {

    //Probes and data collection

    for (int i = 0; i <= 100; i++){
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

    digitalWrite(SOLENOIDPIN, HIGH);
    delay(1000);
    digitalWrite(SOLENOIDPIN, LOW);
    delay(1000);
  }

