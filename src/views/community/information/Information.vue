<template>
  <div class="informationWrap secondary_page_animate">
    <div class="left left_article_list radius">
      <Spin
        v-if="isLoadingConfirmedTx" size="large" fix
        class="absolute"
      />
      <div
        v-if="isLoadingConfirmedTx"
        style="background-color: white;width: 100%;height: 100%;position: absolute;z-index: 0"
      />

      <div ref="listContainer" class="list_container scroll" @scroll="automaticLoadingArticle">
        <div
          v-for="(a,index) in articleList"
          :key="index"
          :class="[ 'article_summary_item',a.isSelect?'selected':'','pointer' ]"
          @click="switchArticle(index)"
        >
          <div class="title">
            {{ a.title }}
          </div>
          <div class="other_info">
            <span class="tag">{{ $t('business') }}</span>
            <span class="from">{{ a.author }}</span>
            <span class="date">{{ a.gtmCreate }}</span>
          </div>
        </div>
        <div v-if="loadAllData" class="load_all_data">
          {{ $t('no_more_data') }}
        </div>
      </div>
    </div>
    <div class="right_article_detail right radius">
      <div ref="articleContainer" class="article_container " @scroll="automaticLoadingComment">
        <Spin
          v-if="isLoadingConfirmedTx" size="large" fix
          class="absolute spin"
        />
        <div
          v-if="isLoadingConfirmedTx"
          style="background-color: white;width: 90%;height: 500px;position: absolute;z-index: 1"
        />

        <div class="title content article_title">
          {{ currentArticle.title }}
        </div>
        <div class="other_info content">
          <span class="tag">
            {{ $t('business') }}/{{ $t('service') }}
          </span>
          <span class="from">
            {{ currentArticle.author }}
          </span>
          <span class="date">
            {{ currentArticle.gtmCreate }}
          </span>
        </div>

        <div class="artile_content scroll content" @scroll="divScroll">
          <div v-html="currentArticle.content" />
          <div class="comment">
            <span class="comment_title"><span
              class="comment_title_text"
            >{{ $t('comment') }}  </span> ({{ totalComment }})</span>

            <div class="input_container">
              <textarea v-model="commentContent" />
              <span class="textarea_text">{{ $t('remaining') }}：{{ remainingWords }} {{ $t('word') }}</span>
            </div>

            <div class="send_comment pointer" @click="checkForm">
              {{ $t('publish') }}
            </div>

            <div class="comment_item_content">
              <div
                v-for="(c,index) in commentList"
                :key="index"
                class="comment_item"
              >
                <div class="account_name">
                  {{ c.nickName === ''? $t('anonymous_user'):c.nickName }}
                </div>
                <div class="comment_content">
                  {{ c.comment }}
                </div>
                <div class="comment_time">
                  {{ c.gtmCreate }}
                </div>
              </div>
              <div v-if="loadAllCommentData && commentList.length !== 0" class="load_all_data">
                {{ $t('no_more_data') }}
              </div>
              <div v-if="commentList.length === 0" class="load_all_data">
                {{ $t('no_comment_yet') }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <CheckPasswordDialog
      v-if="showCheckPWDialog"
      :visible="showCheckPWDialog"
      @close="close"
      @passwordValidated="passwordValidated"
    />
  </div>
</template>

<script lang="ts">
// @ts-ignore
import {InformationTs} from '@/views/community/information/InformationTs.ts'

export default class InputLock extends InformationTs {

}

</script>

<style lang="less" scoped>
  @import "Information.less";
</style>
