#define NOT_AN_INTERRUPT -1

#define flowsensorpin 2  //Defininig a pin
#define AnalogPin0 A0 
#define AnalogPin1 A1



unsigned long currentTime;
volatile int flow_frequency;
float vol = 0.0,l_minute;
int amountparcels = 2;



void setup() {
    pinMode(flowsensorpin, INPUT);
    Serial.begin(9600);
    attachInterrupt(digitalPinToInterrupt(flowsensorpin), flow, RISING); // Setup Interrupt
    reset();
    currentTime = millis();
}

void reset(){
  int soilsensordata[amountparcels];
}

void flow (){

  flow_frequency++;
  
}
void loop() {
//Probes and data collection

 

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
  }
   
