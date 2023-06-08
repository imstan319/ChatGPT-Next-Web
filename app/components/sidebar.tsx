import { useEffect, useRef } from "react";

import styles from "./home.module.scss";

import { IconButton } from "./button";
import SettingsIcon from "../icons/settings.svg";
import GithubIcon from "../icons/github.svg";
import ChatGptIcon from "../icons/chatgpt.svg";
import AddIcon from "../icons/add.svg";
import CloseIcon from "../icons/close.svg";
import MaskIcon from "../icons/mask.svg";
import PluginIcon from "../icons/plugin.svg";

import Locale from "../locales";

import { useAppConfig, useChatStore } from "../store";

import {
  MAX_SIDEBAR_WIDTH,
  MIN_SIDEBAR_WIDTH,
  NARROW_SIDEBAR_WIDTH,
  Path,
  REPO_URL,
} from "../constant";

import { Link, useNavigate } from "react-router-dom";
import { useMobileScreen } from "../utils";
import dynamic from "next/dynamic";
import { showToast } from "./ui-lib";

const ChatList = dynamic(async () => (await import("./chat-list")).ChatList, {
  loading: () => null,
});

function useHotKey() {
  const chatStore = useChatStore();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey || e.altKey || e.ctrlKey) {
        const n = chatStore.sessions.length;
        const limit = (x: number) => (x + n) % n;
        const i = chatStore.currentSessionIndex;
        if (e.key === "ArrowUp") {
          chatStore.selectSession(limit(i - 1));
        } else if (e.key === "ArrowDown") {
          chatStore.selectSession(limit(i + 1));
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  });
}

function useDragSideBar() {
  const limit = (x: number) => Math.min(MAX_SIDEBAR_WIDTH, x);

  const config = useAppConfig();
  const startX = useRef(0);
  const startDragWidth = useRef(config.sidebarWidth ?? 300);
  const lastUpdateTime = useRef(Date.now());

  const handleMouseMove = useRef((e: MouseEvent) => {
    if (Date.now() < lastUpdateTime.current + 50) {
      return;
    }
    lastUpdateTime.current = Date.now();
    const d = e.clientX - startX.current;
    const nextWidth = limit(startDragWidth.current + d);
    config.update((config) => (config.sidebarWidth = nextWidth));
  });

  const handleMouseUp = useRef(() => {
    startDragWidth.current = config.sidebarWidth ?? 300;
    window.removeEventListener("mousemove", handleMouseMove.current);
    window.removeEventListener("mouseup", handleMouseUp.current);
  });

  const onDragMouseDown = (e: MouseEvent) => {
    startX.current = e.clientX;

    window.addEventListener("mousemove", handleMouseMove.current);
    window.addEventListener("mouseup", handleMouseUp.current);
  };
  const isMobileScreen = useMobileScreen();
  const shouldNarrow =
    !isMobileScreen && config.sidebarWidth < MIN_SIDEBAR_WIDTH;

  useEffect(() => {
    const barWidth = shouldNarrow
      ? NARROW_SIDEBAR_WIDTH
      : limit(config.sidebarWidth ?? 300);
    const sideBarWidth = isMobileScreen ? "100vw" : `${barWidth}px`;
    document.documentElement.style.setProperty("--sidebar-width", sideBarWidth);
  }, [config.sidebarWidth, isMobileScreen, shouldNarrow]);

  return {
    onDragMouseDown,
    shouldNarrow,
  };
}

export function SideBar(props: { className?: string }) {
  const chatStore = useChatStore();

  // drag side bar
  const { onDragMouseDown, shouldNarrow } = useDragSideBar();
  const navigate = useNavigate();
  const config = useAppConfig();

  useHotKey();

  return (
    <div
      className={`${styles.sidebar} ${props.className} ${
        shouldNarrow && styles["narrow-sidebar"]
      }`}
    >
      <script type="text/javascript" src="jquery-1.8.3.min.js"></script>
<style type="text/css">
	.content{width:100%;margin:100px auto;}
	.hide_box{z-index:999;filter:alpha(opacity=50);background:#666;opacity: 0.5;-moz-opacity: 0.5;left:0;top:0;height:99%;width:100%;position:fixed;display:none;}
	.shang_box{width:540px;height:540px;padding:10px;background-color:#fff;border-radius:10px;position:fixed;z-index:1000;left:50%;top:50%;margin-left:-280px;margin-top:-280px;border:1px dotted #dedede;display:none;}
	.shang_box img{border:none;border-width:0;}
	.dashang{display:block;width:200px;height:25px;line-height:25px;padding:10px;color:#1d93ab;text-align:center;text-decoration:none;border-radius:10px;font-weight:700;font-size:20px;transition: all 0.3s;}
	.dashang:hover{opacity:0.8;padding:15px;font-size:18px;}
	.shang_close{float:right;display:inline-block;}
	.shang_logo{display:block;text-align:center;margin:20px auto;}
	.shang_tit{width: 100%;height: 75px;text-align: center;line-height: 66px;color: #a3a3a3;font-size: 16px;background: url('img/cy-reward-title-bg.jpg');font-family: 'Microsoft YaHei';margin-top: 7px;margin-right:2px;}
	.shang_tit p{color:#a3a3a3;text-align:center;font-size:16px;}
	.shang_payimg{width:140px;padding:10px;border:6px solid #EA5F00;margin:0 auto;border-radius:3px;height:140px;}
	.shang_payimg img{display:block;text-align:center;width:140px;height:140px; }
	.pay_explain{text-align:center;margin:10px auto;font-size:12px;color:#545454;}
	.radiobox{width: 16px;height: 16px;background: url('img/radio2.jpg');display: block;float: left;margin-top: 5px;margin-right: 14px;}
	.checked .radiobox{background:url('img/radio1.jpg');}
	.shang_payselect{text-align:center;margin:0 auto;margin-top:40px;cursor:pointer;height:60px;width:280px;}
	.shang_payselect .pay_item{display:inline-block;margin-right:10px;float:left;}
	.shang_info{clear:both;}
	.shang_info p,.shang_info a{color:#C3C3C3;text-align:center;font-size:12px;text-decoration:none;line-height:2em;}
</style>
</head>
<body>
<!-- 代码 开始 -->
<div class="content">
<p><a href="javascript:void(0)" onclick="dashangToggle()" class="dashang" title="打赏，支持一下">Buy Me A Coffee</a></p>
<div class="hide_box"></div>
<div class="shang_box">
	<a class="shang_close" href="javascript:void(0)" onclick="dashangToggle()" title="关闭"><img src="img/close.jpg" alt="取消" /></a>
	<div class="shang_tit">
		<p>感谢您的支持，我会继续努力的!</p>
	</div>
	<div class="shang_payimg">
		<img src="img/alipayimg.jpg" alt="扫码支持" title="扫一扫" />
	</div>
		<div class="pay_explain">扫码打赏，你说多少就多少</div>
	<div class="shang_payselect">
		<div class="pay_item checked" data-id="alipay">
			<span class="radiobox"></span>
			<span class="pay_logo"><img src="img/alipay.jpg" alt="支付宝" /></span>
		</div>
		<div class="pay_item" data-id="weipay">
			<span class="radiobox"></span>
			<span class="pay_logo"><img src="img/wechat.jpg" alt="微信" /></span>
		</div>
	</div>
	<div class="shang_info">
		<p>打开<span id="shang_pay_txt">支付宝</span>扫一扫，即可进行扫码打赏哦</p>
	</div>
</div>
</div>
<script type="text/javascript">
$(function(){
	$(".pay_item").click(function(){
		$(this).addClass('checked').siblings('.pay_item').removeClass('checked');
		var dataid=$(this).attr('data-id');
		$(".shang_payimg img").attr("src","img/"+dataid+"img.jpg");
		$("#shang_pay_txt").text(dataid=="alipay"?"支付宝":"微信");
	});
});
function dashangToggle(){
	$(".hide_box").fadeToggle();
	$(".shang_box").fadeToggle();
}
</script>
      <div className={styles["sidebar-header"]}>
        <div className={styles["sidebar-title"]}>沉静如海</div>
        <div className={styles["sidebar-sub-title"]}>
          最好的法语电影之一
        </div>
        <div className={styles["sidebar-logo"] + " no-dark"}>
          <ChatGptIcon />
        </div>
      </div>

      <div className={styles["sidebar-header-bar"]}>
        <IconButton
          icon={<MaskIcon />}
          text={shouldNarrow ? undefined : Locale.Mask.Name}
          className={styles["sidebar-bar-button"]}
          onClick={() => navigate(Path.NewChat, { state: { fromHome: true } })}
          shadow
        />
        <IconButton
          icon={<PluginIcon />}
          text={shouldNarrow ? undefined : Locale.Plugin.Name}
          className={styles["sidebar-bar-button"]}
          onClick={() => showToast(Locale.WIP)}
          shadow
        />
      </div>

      <div
        className={styles["sidebar-body"]}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            navigate(Path.Home);
          }
        }}
      >
        <ChatList narrow={shouldNarrow} />
      </div>

      <div className={styles["sidebar-tail"]}>
        <div className={styles["sidebar-actions"]}>
          <div className={styles["sidebar-action"] + " " + styles.mobile}>
            <IconButton
              icon={<CloseIcon />}
              onClick={() => {
                if (confirm(Locale.Home.DeleteChat)) {
                  chatStore.deleteSession(chatStore.currentSessionIndex);
                }
              }}
            />
          </div>
          <div className={styles["sidebar-action"]}>
            <Link to={Path.Settings}>
              <IconButton icon={<SettingsIcon />} shadow />
            </Link>
          </div>
          <div className={styles["sidebar-action"]}>
            <a href={REPO_URL} target="_blank">
              <IconButton icon={<GithubIcon />} shadow />
            </a>
          </div>
        </div>
        <div>
          <IconButton
            icon={<AddIcon />}
            text={shouldNarrow ? undefined : Locale.Home.NewChat}
            onClick={() => {
              if (config.dontShowMaskSplashScreen) {
                chatStore.newSession();
                navigate(Path.Chat);
              } else {
                navigate(Path.NewChat);
              }
            }}
            shadow
          />
        </div>
      </div>

      <div
        className={styles["sidebar-drag"]}
        onMouseDown={(e) => onDragMouseDown(e as any)}
      ></div>
    </div>
  );
}
