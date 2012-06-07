public class WebsocketServer extends Server {
 
	private final static Logger LOG = Logger.getLogger(WebsocketServer.class);
 
	public WebsocketServer(int port) {
		SelectChannelConnector connector = new SelectChannelConnector();
		connector.setPort(port);
		addConnector(connector);
 
		WebSocketHandler wsHandler = new WebSocketHandler() {
			public WebSocket doWebSocketConnect(HttpServletRequest request,	String protocol) {
				return new FaceDetectWebSocket();
			}
		};
		setHandler(wsHandler);
	}
 
	/**
	 * Simple innerclass that is used to handle websocket connections.
	 * 
	 * @author jos
	 */
	private static class FaceDetectWebSocket implements WebSocket,
			WebSocket.OnBinaryMessage, WebSocket.OnTextMessage {
 
		private Connection connection;
		private FaceDetection faceDetection = new FaceDetection();
 
		public FaceDetectWebSocket() {
			super();
		}
 
		/**
		 * On open we set the connection locally, and enable
		 * binary support
		 */
		public void onOpen(Connection connection) {
			this.connection = connection;
			this.connection.setMaxBinaryMessageSize(1024 * 512);
		}
 
		/**
		 * Cleanup if needed. Not used for this example
		 */
		public void onClose(int code, String message) {}
 
		/**
		 * When we receive a binary message we assume it is an image. We then run this
		 * image through our face detection algorithm and send back the response.
		 */
		public void onMessage(byte[] data, int offset, int length) {
 
			ByteArrayOutputStream bOut = new ByteArrayOutputStream();
			bOut.write(data, offset, length);
			try {
				byte[] result = faceDetection.convert(bOut.toByteArray());				
				this.connection.sendMessage(result, 0, result.length);
			} catch (IOException e) {
				LOG.error("Error in facedetection, ignoring message:" + e.getMessage());
			}
		}
	}
 
	/**
	 * Start the server on port 999
	 */
	public static void main(String[] args) throws Exception {
		WebsocketServer server = new WebsocketServer(9999);
		server.start();
		server.join();
	}	
}