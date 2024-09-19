# mqtt_server.py

import paho.mqtt.client as mqtt

# MQTT Broker Configuration
BROKER_ADDRESS = "www.poolease.cn"
BROKER_PORT = 1883
KEEP_ALIVE = 120

# Topics
SUBSCRIBE_TOPIC = "sub/#sn/data"   # Replace #sn with specific device serial number if needed
PUBLISH_TOPIC = "pub/#sn/data"     # Replace #sn with specific device serial number if needed
WILL_TOPIC = "willTopic"
WILL_MESSAGE = "willData,#sn"

# MQTT Client Configuration
client_id = "server_client"

# Callback function when the client receives a CONNACK response from the server
def on_connect(client, userdata, flags, rc):
    if rc == 0:
        print("Connected to MQTT Broker!")
        # Subscribe to the topic when connected
        client.subscribe(SUBSCRIBE_TOPIC)
    else:
        print("Failed to connect, return code %d\n", rc)

# Callback function when a PUBLISH message is received from the server
def on_message(client, userdata, message):
    print(f"Received message: {message.payload.decode()} on topic {message.topic}")

    # Example: Respond to heartbeats or specific commands from the device
    if message.topic.startswith("sub/") and "11" in message.payload.decode():
        # Respond to the heartbeat or any specific device command
        response_data = '{"11":true, "15":99}'  # Example response
        client.publish(PUBLISH_TOPIC, response_data)
        print(f"Published response to topic {PUBLISH_TOPIC}")

# Callback function when the client disconnects
def on_disconnect(client, userdata, rc):
    print("Disconnected from MQTT Broker with return code %d", rc)

# Create an MQTT client instance with the correct API version
client = mqtt.Client(client_id=client_id, protocol=mqtt.MQTTv311)

# Set Last Will message for when the client disconnects unexpectedly
client.will_set(WILL_TOPIC, WILL_MESSAGE, qos=0, retain=False)

# Attach callback functions
client.on_connect = on_connect
client.on_message = on_message
client.on_disconnect = on_disconnect

# Connect to the MQTT Broker
client.connect(BROKER_ADDRESS, BROKER_PORT, KEEP_ALIVE)

# Blocking loop to the client, processes network traffic, dispatches callbacks, and handles reconnecting
client.loop_forever()
