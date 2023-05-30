import { Spin } from "antd";

function Loading() {
    return ( 
        <Spin tip="در حال بارگذاری..." size="large" >
        <div style={{height:'100vh'}}/>
      </Spin>
     );
}

export default Loading;