import { useState } from "react";

function MemberSettingTable() {
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [enabled, setEnabled] = useState(false);

  const colors = [
    { label: "赤", value: "#FF0000" },
    { label: "オレンジ", value: "#FFA500" },
    { label: "黄色", value: "#FFFF00" },
    { label: "緑", value: "#008000" },
    { label: "水色", value: "#00BFFF" },
    { label: "青", value: "#0000FF" },
    { label: "紫", value: "#800080" },
  ];

  return (
    <table className="w-full border-collapse border border-gray-300">
      <tbody>
        {/* 名前 */}
        <tr>
          <td className="border border-gray-300 p-3 bg-gray-100 w-1/3">名前</td>
          <td className="border border-gray-300 p-3">
            <select
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 rounded p-2 w-full"
            >
              <option value="">選択してください</option>
              <option value="山田">山田</option>
              <option value="佐藤">佐藤</option>
              <option value="中根">中根</option>
            </select>
          </td>
        </tr>

        {/* カラー（色つきプルダウン） */}
        <tr>
          <td className="border border-gray-300 p-3 bg-gray-100">カラー</td>
          <td className="border border-gray-300 p-3">
            <select
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="border border-gray-300 rounded p-2 w-full"
              style={{ backgroundColor: color || "white" }}
            >
              <option value="">選択してください</option>
              {colors.map((c) => (
                <option
                  key={c.value}
                  value={c.value}
                  style={{ backgroundColor: c.value, color: "black" }}
                >
                  {c.label}
                </option>
              ))}
            </select>
          </td>
        </tr>

        {/* 有効チェック */}
        <tr>
          <td className="border border-gray-300 p-3 bg-gray-100">有効チェック</td>
          <td className="border border-gray-300 p-3 flex items-center gap-2">
            <input
              type="checkbox"
              checked={enabled}
              onChange={(e) => setEnabled(e.target.checked)}
              className="w-5 h-5"
            />
            <span>有効</span>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default MemberSettingTable;
