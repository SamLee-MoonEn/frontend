import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { BsPersonFill } from "react-icons/Bs";
import ProfileImageEdit from "../components/MyPage/ProfileImageEdit";
import NicknameForm from "../components/MyPage/NicknameForm";
import PasswordForm from "../components/MyPage/PasswordForm";
import { useNavigate } from "react-router-dom";
import InformModal from "../components/Common/InformModal";
import ConfirmModal from "../components/Common/ConfirmModal";
import { SHOW_MODAL_DELAY } from "../constants/modalTime";
import axios from "axios";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { refreshToken, token } from "../Recoil/token";
import { user } from "../Recoil/user";
import { UserData } from "../interface/interface";

const Container = styled.div`
  ${tw`mx-auto w-11/12 pt-8 text-neutral-600 font-bold text-sm`}
`;

const MyPage = () => {
  const confirmDialogRef = useRef<HTMLDialogElement>(null);
  const informDialogRef = useRef<HTMLDialogElement>(null);
  const navigate = useNavigate();
  const [nicknameForm, setNicknameForm] = useState(false);
  const [passwordForm, setPasswordForm] = useState(false);
  //userInfo는 나중에 useQuery로
  // const [userInfo, setUserInfo] = useState({
  //   email: "이메일",
  //   nickname: "닉네임",
  //   imageUrl:
  //     "https://firebasestorage.googleapis.com/v0/b/javatime-6eaed.appspot.com/o/user%2FJFRkuYjomQVLmW148zv8YXpL3Zi1?alt=media&token=90894058-d360-4451-82b7-cb9e643553f9",
  // });

  const [userInfo, setUserInfo] = useRecoilState<UserData | null>(user);

  const [accessToken, setAccessToken] = useRecoilState(token);
  const [accessRefreshToken, setrefreshAccessToken] =
    useRecoilState(refreshToken);

  const getUserInfo = async () => {
    try {
      // Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzIiwiYXV0aCI6IlJPTEVfTUVNQkVSIiwiZXhwIjoxNjg3NzY5NzQ1fQ.dGLHxoUbyRgd2G2bqLHu4GgMEvnWbi9h3zs4QNERfic
      //eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2ODgzNzI3NDV9.EEGiXqqm4FBxnarDvgHfdMikklMRrHLg3Nkh70L7XWg
      console.log(accessToken);
      console.log(accessRefreshToken);

      const { data } = await axios.get("http://13.124.58.137/member/detail", {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzIiwiYXV0aCI6IlJPTEVfTUVNQkVSIiwiZXhwIjoxNjg3Nzc1MTA4fQ.HLTUGMbfxsqGU6d1blkRIJfPLnaarYTaoCGXe5pAVwA",
          Refreshtoken:
            "eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2ODgzNzgxMDh9.8ziVVirjPtYJu5UG0Y4FhVBck233N1x9FmNeYtSDIa4",
        },
      });
      setUserInfo(data.data);

      // const response = await axios.get("http://13.124.58.137/auth/reissue", {
      //   headers: {
      //     Authorization:
      //       "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI3IiwiYXV0aCI6IlJPTEVfTUVNQkVSIiwiZXhwIjoxNjg3Nzc0NDk2fQ.so31UoL61K-tWQY5uy0qX6KxLcL51V1rXs-htIe5Rxk",
      //     Refreshtoken:
      //       "eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2ODgzNzc0OTZ9.QQSjgvjpvigEso4BnrXtOgP1LPN00ioOuVGvbTsV_Ks",
      //   },
      // });
      // const token = response.headers["authorization"];
      // const refreshToken = response.headers["refreshtoken"];
      // setAccessToken(token);
      // setrefreshAccessToken(refreshToken);
      // localStorage.setItem("token", token);
      // localStorage.setItem("refreshToken", refreshToken);
      // setUserInfo(response.data.data);

      // const res = await axios.post("http://13.124.58.137/auth/signup", {
      //   email: "test7@naver.com",
      //   password: "test123!!",
      //   nickname: "test7",
      // });
      // console.log(res.data);
    } catch (error) {
      console.error(`getUserInfo Error: Time(${new Date()}) ERROR ${error}`);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  const handleSignOut = async () => {
    const res = await axios.post("http://13.124.58.137/auth/logout", null, {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzIiwiYXV0aCI6IlJPTEVfTUVNQkVSIiwiZXhwIjoxNjg3Nzc1MTA4fQ.HLTUGMbfxsqGU6d1blkRIJfPLnaarYTaoCGXe5pAVwA",
        RefreshToken:
          "eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2ODgzNzgxMDh9.8ziVVirjPtYJu5UG0Y4FhVBck233N1x9FmNeYtSDIa4",
      },
    });
    console.log(res.data);

    // navigate("/");
  };

  const confirmWithdrawal = () => {
    if (confirmDialogRef.current) {
      confirmDialogRef.current.showModal();
    }
  };

  const handleWithdrawal = async () => {
    const res = await axios.delete("/api/auth/withdrawal", {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzIiwiYXV0aCI6IlJPTEVfTUVNQkVSIiwiZXhwIjoxNjg3NzY5NzQ1fQ.dGLHxoUbyRgd2G2bqLHu4GgMEvnWbi9h3zs4QNERfic",
        Refreshtoken:
          "eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2ODgzNzI3NDV9.EEGiXqqm4FBxnarDvgHfdMikklMRrHLg3Nkh70L7XWg",
      },
    });
    console.log(res.data);
    //onSuccess에
    if (!informDialogRef.current) return;

    informDialogRef.current.showModal();
    setTimeout(() => {
      if (!informDialogRef.current) return;
      informDialogRef.current.close();
      navigate("/");
    }, SHOW_MODAL_DELAY);
  };

  return (
    <>
      <main className="relative">
        <Container>
          <div className="flex items-center justify-between w-full p-2 pb-4 border-b border-accent-focus/60">
            <div className="relative">
              <div className="w-20 h-20  rounded-full overflow-hidden bg-[#f0f8f6] text-accent shadow-lg">
                {userInfo?.profileImageUrl ? (
                  <img
                    src={userInfo.profileImageUrl}
                    className="w-full"
                    alt="프로필이미지"
                  />
                ) : (
                  <BsPersonFill size={80} className="mt-2" />
                )}
              </div>
              <ProfileImageEdit img={userInfo?.profileImageUrl} />
            </div>
            {nicknameForm ? (
              <NicknameForm formEditor={setNicknameForm} />
            ) : (
              <>
                <div className="w-6/12 px-2 ">{userInfo?.nickname}</div>
                <div>
                  <button
                    onClick={() => {
                      setNicknameForm(true);
                    }}
                    className="btn btn-sm btn-ghost bg-light-color hover:bg-[#dff1ed] shadow mr-2"
                  >
                    수정
                  </button>
                </div>
              </>
            )}
          </div>
          {passwordForm ? (
            <PasswordForm formEditor={setPasswordForm} />
          ) : (
            <div>
              <div className="flex items-center w-full h-16 p-2 border-b border-accent-focus/60">
                <div className="w-1/4">이메일</div>
                <div className="font-normal ">{userInfo?.email}</div>
              </div>
              <div className="flex items-center w-full h-16 p-2 border-b border-accent-focus/60">
                <div className="w-1/4">비밀번호</div>
                <div className="font-normal ">********</div>
              </div>
              <button
                onClick={() => setPasswordForm(true)}
                className="btn btn-accent btn-md my-4 w-full text-base-100 shadow-md"
              >
                비밀번호 변경
              </button>
              <div className="absolute bottom-0 w-11/12 my-4 space-y-4">
                <button
                  onClick={handleSignOut}
                  className="btn w-full shadow-md"
                >
                  로그아웃
                </button>
                <button
                  onClick={confirmWithdrawal}
                  className="btn btn-outline btn-erro w-full shadow-md"
                >
                  서비스 탈퇴
                </button>
              </div>
            </div>
          )}
        </Container>
        <ConfirmModal
          dialogRef={confirmDialogRef}
          confirm=" 정말로 서비스를 탈퇴하시겠습니까?"
          onConfirm={handleWithdrawal}
        />
        <InformModal
          dialogRef={informDialogRef}
          loading={false}
          inform="탈퇴처리가 완료되었습니다."
        />
      </main>
    </>
  );
};
export default MyPage;
