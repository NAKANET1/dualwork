import { useEffect, useState } from "react";

type Props = {
  initialName?: string;
  initialEnabled?: boolean;
  onChange: (data: { name: string; enabled: boolean }) => void;
};

function MemberTable({
  initialName = "",
  initialEnabled = true,
  onChange,
}: Props) {
  const [name, setName] = useState(initialName);
  const [enabled, setEnabled] = useState(initialEnabled);

  // Firestore 取得後の初期値反映対応
  useEffect(() => {
    setName(initialName);
    setEnabled(initialEnabled);
  }, [initialName, initialEnabled]);

  // 値変更時に常に親へ通知
  useEffect(() => {
    onChange({ name, enabled });
  }, [name, enabled, onChange]);

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

export default MemberTable;
