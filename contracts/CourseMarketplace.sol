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

     //mapping of courseHash to Course data
     mapping(bytes32 => Course) private ownedCourses;
     //mapping of courseId to courseHash
     mapping(uint => bytes32) private ownedCourseHashById;

     uint private totalOwnedCourses ;

     address payable owner;

    /// Course already has an Owner!
    error CourseHasOwner();
    /// Only owner can call!
    error CallerNotOwner();
    /// Course in not created yet!
    error CourseIsNotCreated();
    /// Course in not valid!
    error InvalidState();

     constructor(){
         //setting for the owner of the contract At Deploy Time
         setContractOwner(msg.sender);
     }

     modifier onlyOwner{
         if(msg.sender != getContractOwner()){
             revert CallerNotOwner(); 
         }
         _;
     }

     //abi and msg are two objects globally available in the Contract
     function purchaseCourse(bytes16 courseId, bytes32 proof) external payable { 
         
         bytes32 courseHash = keccak256(abi.encodePacked(courseId, msg.sender));
         if(hasCourseOwnership(courseHash)){
             revert CourseHasOwner();
         }
         uint id = totalOwnedCourses++;
         ownedCourseHashById[id] = courseHash;
         ownedCourses[courseHash] = Course({
             id: id,
             price: msg.value,
             proof: proof,
             owner: msg.sender,
             state: State.Purchased
         });
     }
     function activateCourse(bytes32 courseHash) external onlyOwner {
         if(!isCourseCreated(courseHash)){
             revert CourseIsNotCreated(); 
         }
        Course storage course = ownedCourses[courseHash];
         if(course.state != State.Purchased){
            revert InvalidState(); 
         }
        course.state = State.Activated;

     }
     function deactivateCourse(bytes32 courseHash) external onlyOwner {
         if(!isCourseCreated(courseHash)){
             revert CourseIsNotCreated();
         }

         Course storage course = ownedCourses[courseHash];

         if(course.state != State.Purchased){
             revert InvalidState();
         }

         (bool success, ) = course.owner.call{value: course.price }("");
         require(success, "Transfer failed!");

         course.state = State.DeaActivated;
         course.price = 0;
     }
     function transferOwnership(address newOwner) external onlyOwner {
         setContractOwner(newOwner);
     }
     function getCourseCount() external view returns(uint) {
         return totalOwnedCourses;
     }
     function getCourseHashByIndex(uint index) external view returns(bytes32) {
         return ownedCourseHashById[index];
     }
     //whenever specify struct, specify memory
     function getCourseByHash(bytes32 courseHash) external view returns(Course memory) {
         return ownedCourses[courseHash];
     }
     function getContractOwner() view public returns(address) {
         return owner;
     }
     function setContractOwner(address newOwner) private {
         owner = payable(newOwner);
     }
     function hasCourseOwnership(bytes32 courseHash) private view returns(bool){
         return ownedCourses[courseHash].owner == msg.sender;
     }
    function isCourseCreated(bytes32 courseHash) private view returns(bool) {
         return ownedCourses[courseHash].owner  != 0x0000000000000000000000000000000000000000;
     }
    
}

//course id = 10 ni Ascii text
         // 0x00000000000000000000000000003130 - couseId in hexaformad
         // 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4 //40bytes 
         //000000000000000000000000000031305B38Da6a701c568545dCfcB03FcB875f56beddC4 
         //-> //0xc4eaa3558504e2baa2669001b43f359b8418b44a4477ff417b4b007d7cc86e37
         //     0xc4eaa3558504e2baa2669001b43f359b8418b44a4477ff417b4b007d7cc86e37