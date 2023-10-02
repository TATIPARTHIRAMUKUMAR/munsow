// import React, { useState } from 'react';

// const Permission = ({ onPermissionGranted }) => {
//   const [permissionsGranted, setPermissionsGranted] = useState(false);

//   const requestPermissions = async () => {
//     try {
//       await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
//       setPermissionsGranted(true);
//       onPermissionGranted();
//     } catch (error) {
//       // Handle error
//       console.error(error);
//     }
//   };

//   return (
//     <div>
//       <button onClick={requestPermissions}>
//         Grant Permissions
//       </button>
//     </div>
//   );
// };

// export default Permission;
