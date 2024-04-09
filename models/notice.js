const Sequelize = require('sequelize');

module.exports = class Notice extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      // 공지사항 제목
      title: {
        type: Sequelize.STRING(100), // 최대 100자
        allowNull: false, // 필수
      },
      // 공지사항 내용
      content: {
        type: Sequelize.TEXT, // 긴 텍스트
        allowNull: false, // 필수
      },
      // 공지사항 작성일은 timestamps 옵션으로 자동 생성됨
    }, {
      sequelize,
      timestamps: true, // 생성일과 수정일이 자동으로 기록됨
      underscored: false,
      modelName: 'Notice',
      tableName: 'notices',
      paranoid: true, // 삭제일(soft delete)도 기록
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  static associate(db) {
    // 여기에 모델 간의 관계를 설정할 수 있음
  }
};