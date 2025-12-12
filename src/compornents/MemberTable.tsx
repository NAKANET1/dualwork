import { useState } from "react";

function MemberSettingTable({
  initialName = "",
  initialColor = "",
  initialEnabled = true,
}) {
  const [name, setName] = useState(initialName);
  const [color, setColor] = useState(initialColor);
  const [enabled, setEnabled] = useState(initialEnabled);

  const colors = [
    { label: "赤", value: "#FF7F7F" },
    { label: "オレンジ", value: "#FFCC80" },
    { label: "緑", value: "#99D699" },
    { label: "水色", value: "#99E6FF" },
    { label: "青", value: "#8080FF" },
    { label: "ピンク", value: "#FFB5D1" },
    { label: "紫", value: "#D1A3D1" },
  ];

  return (
    <div className="w-200 mx-auto">
      <table className="w-full border-collapse border border-gray-300">
        <tbody>
          {/* 名前 */}
          <tr>
            <td className="border border-gray-300 p-3 bg-gray-100 w-1/3">
              名前
            </td>
            <td className="border border-gray-300 p-3">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border border-gray-300 rounded p-2 w-full"
                placeholder="名前を入力"
              />
            </td>
          </tr>

          {/* カラー */}
          <tr>
            <td className="border border-gray-300 p-3 bg-gray-100">カラー</td>
            <td className="border border-gray-300 p-3">
              <select
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="border border-gray-300 rounded p-2 w-full"
                style={{ backgroundColor: color || "white", color: "black" }}
              >
                <option value="">選択してください</option>
                {colors.map((c) => (
                  <option
                    key={c.value}
                    value={c.value}
                    style={{
                      backgroundColor: c.value,
                      color: "white",
                    }}
                  >
                    {c.label}
                  </option>
                ))}
              </select>
            </td>
          </tr>

          {/* 有効チェック */}
          <tr>
            <td className="border border-gray-300 p-3 bg-gray-100">
              有効チェック
            </td>
            <td className="border border-gray-300 p-3">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={enabled}
                  onChange={() => setEnabled(!enabled)}
                  className="w-5 h-5"
                />
                <span>有効</span>
              </label>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default MemberSettingTable;
