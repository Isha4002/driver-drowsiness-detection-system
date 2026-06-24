import { useEffect, useState } from "react";
import axios from "axios";

function SettingsPanel() {

  const [threshold, setThreshold] =
    useState(0.20);

  const [alarm, setAlarm] =
    useState(true);

  useEffect(() => {

    axios
      .get("http://127.0.0.1:5000/settings")
      .then((res) => {

        setThreshold(
          res.data.ear_threshold
        );

        setAlarm(
          res.data.alarm_enabled
        );

      });

  }, []);

  const saveSettings = () => {

    axios.post(
      "http://127.0.0.1:5000/settings",
      {
        ear_threshold: threshold,
        alarm_enabled: alarm
      }
    );

    alert("Settings Saved");
  };

  return (

    <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800">

      <h2 className="text-3xl font-bold mb-6">
        Settings
      </h2>

      <div className="space-y-6">

        <div>

          <label>
            EAR Threshold
          </label>

          <input
            type="number"
            step="0.01"
            value={threshold}
            onChange={(e) =>
              setThreshold(
                e.target.value
              )
            }
            className="w-full mt-2 bg-slate-800 p-3 rounded-xl"
          />

        </div>

        <div>

          <label>
            Alarm Enabled
          </label>

          <select
            value={alarm}
            onChange={(e) =>
              setAlarm(
                e.target.value === "true"
              )
            }
            className="w-full mt-2 bg-slate-800 p-3 rounded-xl"
          >

            <option value="true">
              Enabled
            </option>

            <option value="false">
              Disabled
            </option>

          </select>

        </div>

        <button
          onClick={saveSettings}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl"
        >
          Save Settings
        </button>

      </div>

    </div>

  );
}

export default SettingsPanel;