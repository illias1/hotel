export const Mayormapiframe = () => (
  <div className="mapouter">
    <div className="gmap_canvas">
      <iframe
        id="gmap_canvas"
        src="https://maps.googleapis.com/maps/api/staticmap?center=40.714%2c%20-73.998&zoom=12&size=400x400&key=AIzaSyCyDzWCBWsP4WBwK7Odu8_qMRV_pAqDnQc"
        scrolling="no"
        marginHeight={0}
        marginWidth={0}
        width={808}
        height={500}
        frameBorder={0}
      />
      <a href="https://www.whatismyip-address.com" />
      <br />
      <style
        dangerouslySetInnerHTML={{
          __html: ".mapouter{position:relative;text-align:right;height:500px;width:808px;}",
        }}
      />
      <a href="https://www.embedgooglemap.net">embedgooglemap.net</a>
      <style
        dangerouslySetInnerHTML={{
          __html:
            ".gmap_canvas {overflow:hidden;background:none!important;height:500px;width:808px;}",
        }}
      />
    </div>
  </div>
);
