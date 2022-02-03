import React from 'react';
import './SideMenu.css';

function SideMenu({ keys, currentKey, setCurrentKey }) {

    const setActiveTab = (e, key) => {
        setCurrentKey(key);
    }

    const showKeys = () => {
        return keys.map((key, i) => {
            const active = currentKey === key ? true : false;
            var classString = "";
            if (active) {
                classString = "nav-link mb-3 p-3 shadow active"
            } else {
                classString = "nav-link mb-3 p-3 shadow"
            }
            return <a onClick={(e) => setActiveTab(e, key)} class={classString} data-toggle="pill" role="tab">
                <span class="font-weight-bold small text-uppercase">{key}</span>
            </a>
        });
    }

    return <div class='col-md-2 mt-5'>
        
                {/* Tabs nav */}
                <div class="nav flex-column nav-pills nav-pills-custom unselectable" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                    {showKeys()}
                    {/* <a onClick={setActiveTab} class="nav-link mb-3 p-3 shadow active" id="v-pills-home-tab" aria-selected="true">
                        <i class="fa fa-user-circle-o mr-2"></i>
                        <span class="font-weight-bold small text-uppercase">Personal information</span>
                    </a>

                    <a class="nav-link mb-3 p-3 shadow" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="false">
                        <i class="fa fa-calendar-minus-o mr-2"></i>
                        <span class="font-weight-bold small text-uppercase">Bookings</span>
                    </a>

                    <a class="nav-link mb-3 p-3 shadow" id="v-pills-messages-tab" data-toggle="pill" href="#v-pills-messages" role="tab" aria-controls="v-pills-messages" aria-selected="false">
                        <i class="fa fa-star mr-2"></i>
                        <span class="font-weight-bold small text-uppercase">Reviews</span>
                    </a>

                    <a class="nav-link mb-3 p-3 shadow" id="v-pills-settings-tab" data-toggle="pill" href="#v-pills-settings" role="tab" aria-controls="v-pills-settings" aria-selected="false">
                        <i class="fa fa-check mr-2"></i>
                        <span class="font-weight-bold small text-uppercase">Confirm booking</span>
                    </a> */}
        </div>
    </div>;
}

export default SideMenu;