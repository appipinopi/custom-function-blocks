// --- ブロック登録 ---

// 1. カスタム関数定義ブロック (例: Pythonの def function_name(arg): を生成)
api.registerBlock('custom_define_function', {
  init: function() {
    // 関数名入力
    this.appendDummyInput()
      .appendField('関数を定義')
      .appendField(new Blockly.FieldTextInput('my_function'), 'NAME');

    // 引数入力 (カンマ区切りの文字列を想定)
    this.appendDummyInput()
      .appendField('引数:')
      .appendField(new Blockly.FieldTextInput('arg1, arg2'), 'ARGS');

    // 処理本体
    this.appendStatementInput('DO')
      .setCheck(null);

    this.setColour('#e05a00'); // オレンジ系の色
    this.setTooltip('指定された名前と引数で関数を定義します。');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  }
}, function(block) {
  const name = block.getFieldValue('NAME'); // 関数名を取得
  const args = block.getFieldValue('ARGS'); // 引数文字列を取得
  const branch = Blockly.Python.statementToCode(block, 'DO'); // 処理本体のコードを取得

  // Pythonコード生成: def function_name(arg1, arg2):
  const code = `def ${name}(${args}):\n${branch}`;
  return code;
});

// 2. 回数指定ループブロック (例: Pythonの for i in range(count): を生成)
api.registerBlock('custom_repeat_loop', {
  init: function() {
    // 回数入力
    this.appendValueInput('COUNT')
      .setCheck('Number')
      .appendField('指定回数');
    this.appendDummyInput()
      .appendField('繰り返す (i=インデックス)');

    // 処理本体
    this.appendStatementInput('DO')
      .setCheck(null);

    this.setColour('#0a6e00'); // 緑系の色
    this.setTooltip('指定された回数だけ処理を繰り返します。インデックスiが0から始まります。');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  }
}, function(block) {
  const count = Blockly.Python.valueToCode(block, 'COUNT', Blockly.Python.ORDER_NONE) || '0'; // 回数を取得
  const branch = Blockly.Python.statementToCode(block, 'DO'); // 処理本体のコードを取得

  // Pythonコード生成: for i in range(count):
  const code = `for i in range(${count}):\n${branch}`;
  return code;
});

// --- カテゴリー登録 ---
// 登録したブロックをツールボックスの新しいカテゴリーに追加します。
api.addCategory('カスタム関数・ループ', '#388e3c', [ // 色は緑系 (マテリアルデザインのGreen-700)
  'custom_define_function',
  'custom_repeat_loop'
]);

// --- 日本語翻訳の追加 (オプション) ---
api.addTranslation('ja', {
    // ここではブロックフィールドのカスタムテキストがないため、基本的に不要ですが、将来的な拡張に備えて空のオブジェクトを渡します。
});

// ロード時のログ出力 (デバッグ用)
api.execute(`console.log('カスタム関数・ループ プラグインが読み込まれました。')`);
