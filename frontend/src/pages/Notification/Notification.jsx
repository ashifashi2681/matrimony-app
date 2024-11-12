import React from 'react'
import NotificationCard from '../../components/NotificationCard';
import LeftMenu from '../../components/LeftMenu';
import RightMenu from '../../components/RightMenu';


function Notification() {
  return (
		<div className="flex">
			<LeftMenu />
			<div className="w-full">
				<p className='text-fs-lg font-semibold px-5 py-8'>Notifications</p>
				<div>
					<NotificationCard
						subTitle={"News"}
						title={"News Title"}
						msg={
							"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore debitis, rerum tempora necessitatibus repellendus animi!"
						}
						time={"Today 10:30PM"}
						status={""}
					/>
					<NotificationCard
						subTitle={""}
						title={"Successfully Messaage"}
						msg={""}
						time={"Today 10:30PM"}
						status={"success"}
					/>
					<NotificationCard
						subTitle={""}
						title={"Alert Message"}
						msg={""}
						time={"Today 10:30PM"}
						status={"warning"}
					/>
					<NotificationCard
						subTitle={""}
						title={"Error Message"}
						msg={""}
						time={"Today 10:30PM"}
						status={"error"}
					/>
				</div>
			</div>
			<RightMenu />
		</div>
  );
}

export default Notification