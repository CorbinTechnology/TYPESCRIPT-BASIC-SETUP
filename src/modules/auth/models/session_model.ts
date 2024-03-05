interface SessionProps {
    session_token: string;
    session_id: string;
    session_log_in_time: Date;
    session_log_out_time?: Date;
    session_ip_address: string;
    session_agent: string;
  }
  
  class SessionModel implements SessionProps {
    session_token: string;
    session_id: string;
    session_log_in_time: Date;
    session_log_out_time?: Date;
    session_ip_address: string;
    session_agent: string;
  
    constructor(_props: SessionProps) {
      this.session_token = _props.session_token;
      this.session_id = _props.session_id;
      this.session_log_in_time = _props.session_log_in_time;
      this.session_log_out_time = _props.session_log_out_time;
      this.session_ip_address = _props.session_ip_address;
      this.session_agent = _props.session_agent;
    }
  }
  
  export default SessionModel;