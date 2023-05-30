import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";
function NotFound() {
    const navigate=useNavigate()
  return (
    <Result
      status="404"
      title="404"
      subTitle="به نظر میاد راه رو اشتباه اومدی :)"
      extra={<Button onClick={()=>navigate('/')} type="primary">برگرد به خونه</Button>}
    />
  );
}

export default NotFound;
