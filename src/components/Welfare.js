import React, { useState } from 'react';
import TMap2 from './WelfareTMap';
import '../css/Welfare.scss';

const LegalProtection = () => (
  <section className="legal">
    <div className="content">
      <div className="image">
        <img
          src={process.env.PUBLIC_URL + '/images/3994262_2117465.jpg'}
          alt="법적 보호 사진"
          style={{ maxWidth: '100%', height: 'auto' }}
        />
      </div>
      <div className="text">
        <h2>법적 보호</h2>
        <br />
        <br />
        <ol className="text2">
          <li>- 교통약자의 이동편의 증진법</li>
          <br />
          <li>- 장애인, 노인, 임산부 등의 편의증진 보장에 관한 법률</li>
          <br />
          <li>- 어린이, 노인 및 장애인 보호구역의 지정 및 관리에 관한 규칙</li>
          <br />
        </ol>
        <br />
        <div className="text3">
          <p>
            교통약자가 안전하고 편리하게 이동할 수 있도록 사람중심의 교통체계를
            구축함으로써 <br></br>교통약자의 사회 참여와 복지 증진에 이바지함을
            목적으로 합니다
          </p>
          <p>
            편리하고 안전한 교통서비스의 선두주자로 거듭나기 위해 <br></br>
            새로운 솔루션을 제공하며 많은 노력을 기울이고 있습니다
          </p>
        </div>
      </div>
    </div>
  </section>
);

const TransportSupport = () => (
  <section className="transport">
    <h2>교통비 지원</h2>
    <div>
      <p className="gpass">
        <img
          src={process.env.PUBLIC_URL + '/images/gpass.jpg'}
          alt="G-PASS 우대용 교통카드"
          style={{ width: '400px', height: '190px' }}
        />
        <p className="gpassCard">
          <a
            href="https://www.gg.go.kr/contents/contents.do?ciIdx=762&menuId=2538"
            target="_blank"
            rel="noopener noreferrer"
          >
            G-PASS 우대용 교통카드
          </a>

          <br />
          <br />
          <h4>▶ G-PASS 우대용 교통카드란?</h4>
          <br />
          <span>
            경기도에 거주하는 수도권 전철·지하철 무임승차 대상자의 <br />
            교통편의를 위해 경기도에서 무료로 발급하는 '지하철 무임 교통카드'로,
            <br />
            기존 종이승차권 대신 반복 사용이 가능한
            '비접촉식(RF)교통카드'입니다.
          </span>

          <br />
        </p>
      </p>
      <p className="kpass">
        <img
          src={process.env.PUBLIC_URL + '/images/kpass.webp'}
          alt="K-PASS"
          style={{ width: '400px', height: '200px' }}
        />
        <p className="kpassCard">
          <a
            href="https://korea-pass.kr/"
            target="_blank"
            rel="noopener noreferrer"
          >
            K-PASS
          </a>
          <br />
          <br />
          <h4>▶ K-PASS란?</h4>

          <br />
          <span>
            경기도민 교통비 부담 완화 및 대중교통 이용 활성화를 위한 전국 최강!
            <br></br>
            경기도민 맞춤형 교통비 지원 카드입니다.
          </span>
        </p>
      </p>
    </div>
  </section>
);

const AccessibilityFeatures = () => (
  <section className="acess">
    <h2>접근성 기능</h2>
    <div>
      <p className="gbus">
        <img
          src={process.env.PUBLIC_URL + '/images/accessibility1.png'}
          alt="경기 저상 버스 정보"
        />
        <p className="gbusText">
          <a
            href="https://www.gbis.go.kr/service/busInfo/lowfloorBus.action?cmd=lowfloorAuto"
            target="_blank"
            rel="noopener noreferrer"
          >
            경기 저상 버스 정보
          </a>
          <div>
            <h4>경기도 교통정보센터 - 저상버스</h4>
            <span>
              경기도 교통정보센터를 통해 교통약자용 교통정보(저상버스)를
              제공합니다.
              <br />
              해당 사이트로 들어가시면 출발지와 종점 및 배차 간격 등의 정보를
              확인하실 수 있습니다.
            </span>
          </div>
        </p>
      </p>
      <p className="moving">
        <img
          src={
            process.env.PUBLIC_URL + '/images/KakaoTalk_20240531_131033875.jpg'
          }
          alt="광역이동지원 서비스"
        />
        <p className="movingText">
          <div>
            <a
              href="https://ggsts.gg.go.kr/front/index.do"
              target="_blank"
              rel="noopener noreferrer"
            >
              교통약자 광역이동지원 서비스
            </a>
            <div>
              <h4>광역이동지원시스템 소개</h4>
              <span>
                경기도광역이동지원시스템은 경기도 시/군에서 운영되고 있는
                특별교통수단을 이용하고자하는
                <br />
                교통약자가 친철하고 안전하게 이동서비스를 제공받도록 합니다.
              </span>
            </div>
          </div>
        </p>
      </p>
      <p className="center">
        <img
          src={
            process.env.PUBLIC_URL + '/images/KakaoTalk_20240531_131052538.jpg'
          }
          alt="교통약자이동지원센터 "
        />

        <p className="centerText">
          <p className="textCenter">교통약자 이동지원센터</p>
          <h4>교통약자 이동지원센터 현황</h4>
          <div>
            <p>
              경기도 각 시‧군별 교통약자이동지원센터 홈페이지에서 제공하는
              정보입니다.
            </p>
            <TMap2 />
          </div>
        </p>
      </p>
    </div>
  </section>
);

const Welfare = () => {
  const [activeTab, setActiveTab] = useState('legalProtection');

  return (
    <div className="box">
      <nav>
        <div className="tab">
          <p>
            <a
              href="#"
              className={activeTab === 'legalProtection' ? 'active' : ''}
              onClick={() => setActiveTab('legalProtection')}
            >
              법적 보호
            </a>
          </p>
          <p>
            <a
              href="#"
              className={activeTab === 'transportSupport' ? 'active' : ''}
              onClick={() => setActiveTab('transportSupport')}
            >
              교통비 지원
            </a>
          </p>
          <p>
            <a
              href="#"
              className={activeTab === 'accessibilityFeatures' ? 'active' : ''}
              onClick={() => setActiveTab('accessibilityFeatures')}
            >
              접근성 기능
            </a>
          </p>
        </div>
      </nav>
      {activeTab === 'legalProtection' && <LegalProtection />}
      {activeTab === 'transportSupport' && <TransportSupport />}
      {activeTab === 'accessibilityFeatures' && <AccessibilityFeatures />}
    </div>
  );
};

export default Welfare;
