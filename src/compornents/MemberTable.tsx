import { useState } from "react";

function MemberSettingTable({
  initialName = "",
  initialEnabled = true,
}) {
  const [name, setName] = useState(initialName);
  const [enabled, setEnabled] = useState(initialEnabled);



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
