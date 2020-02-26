/**
 * Alert factory for setting alerts on an div
 * Usage:
 * myAlert = alertFactory(alertId);
 * myAlert(false); // Hide Alert
 * myAlert("Msg"); // Show an Alert
 * After creating an alert call alert
 * @param {String} id ID of div element to use for alert
 * @param {Number} timeoutMs Duration to show alert in ms
 */
const alertFactory = (id) => {
  const setAlert = (msg, style = "alert-danger", timeoutMs = 5000) => {
    const alertEl = document.getElementById(id);
    if (!alertEl) throw new Error(`Failed to Find Alert Element! ${id}`);

    if (typeof msg === "boolean") {
      alertEl.innerHTML = "";
      alertEl.classList = [];
    } else {
      alertEl.classList.add("alert", ...style.split(" "));
      alertEl.innerHTML = msg;
      if (timeoutMs > 0) {
        setTimeout(() => { setAlert(false) }, timeoutMs);
      }
    }
  }
  return setAlert;
}

export default alertFactory