export const Mayormapiframe = () => (
  <div className="mapouter">
    <div className="gmap_canvas">
      <iframe
        id="gmap_canvas"
        src="https://maps.google.com/maps?q=plaza%20mayor%20calpe&t=&z=17&ie=UTF8&iwloc=&output=embed"
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
