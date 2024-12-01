import Image from "next/image";
import WikiButton from "@/components/landingpage/wikiButton";
import WikiButton2 from "@/components/landingpage/wikiButton2";
import styles from "@/styles/landingpage/styles.module.scss";

const Landing: React.FC = () => {
  return (
    <div className={styles.allContain}>
      <div className={styles.allContain2}>
        <div className={styles.roundBackground}></div>
        <div className={styles.topContain}>
          <div className={styles.titleContain1}>
            <h3 className={styles.title1}>남들이 만드는</h3>
            <div className={styles.smtitleContain}>
              <h3 className={styles.title2}>나만의&nbsp;</h3>
              <h3 className={styles.title2}>위키</h3>
            </div>
            <WikiButton />
            <Image
              src="/images/img/img_Main1.svg"
              alt="Main Image"
              width={490}
              height={580}
            />
          </div>

          <div className={styles.titleContain2}>
            <div className={styles.innerContain2}>
              <div className={styles.secondInContain}>
                <div className={styles.topHcontain}>
                  <p className={styles.subTitle}>WRITE</p>
                  <h3 className={styles.title}> 친구의 위키,</h3>
                  <h3 className={styles.title}>직접 작성해 봐요</h3>
                </div>
                <div className={styles.imgContain1}>
                  <Image
                    src="/images/img/img_Main2.svg"
                    alt="Main Image 2"
                    width={310}
                    height={450}
                  />
                </div>
              </div>
              <Image
                src="/images/img/img_Main3.svg"
                alt="Main Image 3"
                width={500}
                height={500}
              />
            </div>
          </div>
        </div>
        <div className={styles.bottomContain}>
          <div className={styles.behindContain1}>
            <div className={styles.titleContain3}>
              <p className={styles.subTitle}>SHARE</p>
              <h3 className={styles.title1}>내 위키 만들고</h3>
              <h3 className={styles.title1}>친구에게 공유해요</h3>
            </div>

            <div className={styles.photoContain}>
              <div className={styles.iconContain1}>
                <Image
                  src="/images/img/img_Speaker.svg"
                  alt="ICON1"
                  width={250}
                  height={250}
                />
              </div>
              <div className={styles.iconContain2}>
                <Image
                  src="/images/img/img_W.svg"
                  alt="ICON2"
                  width={250}
                  height={250}
                />
              </div>
              <div className={styles.iconContain3}>
                <Image
                  src="/images/img/img_Phone.svg"
                  alt="ICON3"
                  width={250}
                  height={250}
                />
              </div>
              <div className={styles.iconContain4}>
                <Image
                  src="/images/img/img_Message.svg"
                  alt="ICON4"
                  width={250}
                  height={250}
                />
              </div>
              <div className={styles.iconContain1}>
                <Image
                  src="/images/img/img_Speaker.svg"
                  alt="ICON1"
                  width={250}
                  height={250}
                />
              </div>
              <div className={styles.iconContain2}>
                <Image
                  src="/images/img/img_W.svg"
                  alt="ICON2"
                  width={250}
                  height={250}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.behindContain}>
          <div className={styles.titleContain4}>
            <div className={styles.titleContain5}>
              <div className={styles.topHcontain}>
                <p className={styles.subTitle}>VIEW</p>
                <h3 className={styles.title1}>친구들이 달아준</h3>
                <h3 className={styles.title1}>내용을 확인해봐요</h3>
              </div>
              <div className={styles.behindContain3}>
                <div className={styles.imgContain5}>
                  <Image
                    src="/images/img/img_Main4.svg"
                    alt="Main Image 4"
                    width={700}
                    height={250}
                  />
                </div>
              </div>
              <div className={styles.behindContain2}>
                <div className={styles.iconContain6}>
                  <Image
                    src="/images/img/img_bell.svg"
                    alt="icon5"
                    width={250}
                    height={250}
                  />
                </div>
                <div className={styles.imgContain5}>
                  <Image
                    src="/images/img/img_Main5.svg"
                    alt="Main Image 5"
                    width={470}
                    height={300}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.titleContain6}>
            <h3 className={styles.title4}>나만의 위키 만들어보기</h3>
            <WikiButton2 />
          </div>
        </div>
        <footer className={styles.footer}>
          <div className={styles.footContain1}>
            <p className={styles.fooTer1}>
              Copyright ⓒ Wikid. All Rights Reserved
            </p>
          </div>
          <div className={styles.footContain2}>
            <p className={styles.fooTer2}>
              사업자등록번호 000-00-00000 | 통신판매신고 제2020-서울-00000호 |
              대표 : 이지은
            </p>
            <p className={styles.fooTer2}>
              서울특별시 중구 청계천로 123, 위키드빌딩
            </p>
          </div>
          <div className={styles.footContain3}>
            <p className={styles.fooTer3}>서비스 이용약관</p>
            <p className={styles.fooTer3}>개인정보 취급방침</p>
            <p className={styles.fooTer3}>전자금융거래 기본약관</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Landing;
