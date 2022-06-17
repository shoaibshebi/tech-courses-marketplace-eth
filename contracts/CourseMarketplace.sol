// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract CourseMarketplace{
     enum State{
         Purchased,
         Activated,
         DeaActivated
     }

     //struct is like obj in JS
     struct Course{
         uint id; //uinit= 32byte
        uint price; //uinit= 32byte
        bytes32 proof;//unique string of the course purchaser
        address owner; //20 bytes
        State state;//1 byte
     }

     //abi and msg are two objects globally available in the Contract
     function purchaseCourse(bytes16 courseId, bytes32 proof) external payable returns(bytes32) {
         //course id = 10 ni Ascii text
         // 0x00000000000000000000000000003130 - couseId in hexaformad
         // 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4 //40bytes 
         //000000000000000000000000000031305B38Da6a701c568545dCfcB03FcB875f56beddC4 
         //-> //0xc4eaa3558504e2baa2669001b43f359b8418b44a4477ff417b4b007d7cc86e37
         //     0xc4eaa3558504e2baa2669001b43f359b8418b44a4477ff417b4b007d7cc86e37
         bytes32 courseHash = keccak256(abi.encodePacked(courseId, msg.sender));
         return courseHash;
     }
}