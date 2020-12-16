#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClient.h>

const char* ssid = "PDC";
const char* password = "Scott44572Glenn";

//Your Domain name with URL path or IP address with path
String serverDonneesParcelle = "https://api.pot-app.be/api/donnees-parcelle/";
String serverDonneesUser = "https://api.pot-app.be/api/donnees-user/";
String serverName = "";
String userCode = "codeCelia";
// the following variables are unsigned longs because the time, measured in
// milliseconds, will quickly become a bigger number than can be stored in an int.
unsigned long lastTime = 0;
// Timer set to 10 minutes (600000)
//unsigned long timerDelay = 600000;
// Set timer to 5 seconds (5000)
unsigned long timerDelay = 5000;

float temp_exterieure;
float hum_exterieure;

float id_parcelle_1;
float hum_sol_parcelle_1;
float quantite_eau_parcelle_1;

float id_parcelle_2;
float hum_sol_parcelle_2;
float quantite_eau_parcelle_2;

float id_parcelle_3;
float hum_sol_parcelle_3;
float quantite_eau_parcelle_3;

boolean newData = false;

void postToParcel(String parcelleId, String humidite_sol, String quantite_eau){
    if(WiFi.status()== WL_CONNECTED){
      HTTPClient http;
      WiFiClientSecure client;
      client.setInsecure(); //the magic line, use with caution
      client.connect(serverDonneesUser, 443);
      
      // Your Domain name with URL path or IP address with path
      http.begin(client, serverDonneesParcelle);
      
      // Specify content-type header
      http.addHeader("Content-Type", "application/x-www-form-urlencoded");
      // Data to send with HTTP POST
      
      // If you need an HTTP request with a content type: application/json, use the following:
      http.addHeader("Content-Type", "application/json");
      String jsonObject = "{\"parcelleId\":" + parcelleId + ",\"humidite_sol\":" + humidite_sol + ",\"quantite_eau_litre\": \"" + quantite_eau + "\",\"code\": \"" +  userCode + "\"}";
      int httpResponseCode = http.POST(jsonObject);

     
      Serial.print("HTTP Response code: ");
      Serial.println(httpResponseCode);
        
      // Free resources
      http.end();
    }
    else {
      Serial.println("WiFi Disconnected");
    }
}

void postToUser(String temperature_exterieur, String humidite_exterieur){
    if(WiFi.status()== WL_CONNECTED){
      HTTPClient http;
      WiFiClientSecure client;
      client.setInsecure(); //the magic line, use with caution
      client.connect(serverDonneesUser, 443);
      
      // Your Domain name with URL path or IP address with path
      http.begin(client, serverDonneesUser);
      
      // Specify content-type header
      http.addHeader("Content-Type", "application/x-www-form-urlencoded");
      // Data to send with HTTP POST
      
      // If you need an HTTP request with a content type: application/json, use the following:
      http.addHeader("Content-Type", "application/json");
      
      String jsonObject = "{\"userId\":\" 1 \",\"temperature_exterieur\":" + temperature_exterieur + ",\"humidite_exterieur\": \"" + humidite_exterieur + "\",\"code\": \"" +  userCode + "\"}";
      int httpResponseCode = http.POST(jsonObject);
     
      Serial.print("HTTP Response code: ");
      Serial.println(httpResponseCode);
      String payload = http.getString();
      Serial.println(payload);
      // Free resources
      http.end();
    }
    else {
      Serial.println("WiFi Disconnected");
    }
}
void setup() {
  Serial.begin(115200); 

  WiFi.begin(ssid, password);
  Serial.println("Connecting");
  while(WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Connected to WiFi network with IP Address: ");
  Serial.println(WiFi.localIP());
 
  Serial.println("Timer set to 5 seconds (timerDelay variable), it will take 5 seconds before publishing the first reading.");
}

void loop() {
  //Send an HTTP POST request every 10 minutes
  newData = true;
  Serial.println("NewData true");
  delay(5000);
  if (newData) { 
    postToParcel("5", "80", "2.5");
    delay(2000);
    postToParcel("5", "80", "2.5");
    delay(2000);
    postToUser("22.5","25");
    newData = false;
    Serial.println("NewData false");
  }
  
  
  //GET REQUEST NOT USED
  if (false) {
    //Check WiFi connection status
    if(WiFi.status()== WL_CONNECTED){
      
      HTTPClient http;

      String serverPath = serverName + "?code=codeCelia";
      
      WiFiClientSecure client;
      client.setInsecure(); //the magic line, use with caution
      client.connect(serverPath, 443);
      
      Serial.println(serverPath);
      // Your Domain name with URL path or IP address with path
      http.begin(client, serverPath.c_str());
      
      // Send HTTP GET request
      int httpResponseCode = http.GET();
      
      if (httpResponseCode>0) {
        Serial.print("HTTP Response code: ");
        Serial.println(httpResponseCode);
        String payload = http.getString();
        Serial.println(payload);
      }
      else {
        Serial.print("Error code: ");
        Serial.println(httpResponseCode);
      }
      // Free resources
      http.end();
    }
    else {
      Serial.println("WiFi Disconnected");
    }
    lastTime = millis();
  }
}
