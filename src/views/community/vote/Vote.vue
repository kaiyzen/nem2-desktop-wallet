<template>
  <div class="vote_container radius">
    <div class="top_button letter_spacing">
      <span
              @click="swicthVoteAction(index)"
              :class="['transaction_btn',t.isSelect?'selected_button':'', t.disabled?'disabled_button':'','pointer']"
              v-for="(t,index) in voteActionList">
        {{$t(t.name)}}
        </span>
      <!--      <div>-->
      <!--        <Select v-show="voteActionList[0].isSelect" class="vote_filter" v-model="currentVoteFilter" style="width:100px">-->
      <!--          <Option class="pointer" v-for="(item,index) in voteFilterList" :value="item.value" :key="index">-->
      <!--            {{ $t(item.label)}}-->
      <!--          </Option>-->
      <!--        </Select>-->
      <!--      </div>-->

    </div>

    <div class="show_exists_vote_list" v-show="voteActionList[0].isSelect">
      <div class="bottom_vote_list">
        <div class="left  scroll left_article_list" ref="voteListContainer" @scroll="automaticLoadingVote">

          <div @click="switchVote(index)" v-for="(v,index) in currentVoteList"
               :class="['article_summary_item',v.isSelect?'selected':'','pointer']">
            <div class="left left_info">
              <div class="title">{{v.title}}
              </div>
              <div class="other_info">
                <span class="date letter_spacing">{{$t('deadline')}} : {{v.deadline}}</span>
                <span class="time_tag">
                   <span v-if='v.voteStatus == 1' :class="v.isSelect?'yellow':'blue'">{{$t('processing')}}</span>
                  <span v-if='v.voteStatus == 2' :class="v.isSelect?'yellow':'orange'">{{$t('already_involved')}}</span>
                  <span v-if='v.voteStatus == 3' :class="v.isSelect?'yellow':''">{{$t('finished')}}</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div class="right_article_detail radius  right" v-if="currentVoteList.length >0">

          <div class="right_container scroll">
            <Spin size="large" class="absolute" fix v-if="spinShow"></Spin>

            <div class="initor">
              <span class="blue">{{$t('initiation_address')}}: </span>
              <span>{{currentVote.address}}</span>
            </div>
            <!--            <div class="vote_address">-->
            <!--              <span class="blue">{{$t('voting_address')}}</span>-->
            <!--              <span>ad5as4d5a4d5as4d5as5d45asd54sa5d45as4d5as4d5a</span>-->
            <!--            </div>-->
            <div class="title">{{currentVote.title}}</div>
            <div class="date letter_spacing"><span class="orange"> {{$t('deadline')}} </span>:
              <span>{{currentVote.deadline}}</span></div>
            <div class="content">{{currentVote.content}}</div>
            <div class="selection">
              <RadioGroup v-model="sigleSelection" v-if="!currentVote.isMultiple">
                <Radio v-for="(i,index) in selections" :key="index" :label="i.id">
                  {{alphabet[index] + ' : '+i.name}}
                </Radio>
              </RadioGroup>
            </div>
            <div class="pie_chart">
              <PieChart :selections="selections"></PieChart>
            </div>
            <div @click="sendVote" :class="['click_to_vote',isVoted?'voted':'not_voted']">
              {{isVoted?$t('already_involved'):$t('confirm_vote')}}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="create_vote scroll radius" v-show="!voteActionList[0].isSelect">
      <div class="vote_creating_content">
        <div class="vote_title">
          <span class="title">{{$t('title')}}</span>
          <span class="value radius">
            <input v-model="formItem.title" :placeholder="$t('please_enter_a_voting_title')" type="text">
          </span>
        </div>
        <div class="vote_describe">
          <span class="title">{{$t('description')}}</span>
          <span class="value radius">
          <textarea :placeholder="$t('about_voting_content_description')"
                    class="scroll"
                    v-model="formItem.content"
          >
          </textarea>
        </span>
        </div>
        <div class="vote_selections">
          <span class="title">{{$t('option')}}</span>
          <span class="selection_list right">
          <div class="list_cloumn" v-for="(s,index) in formItem.optionList">
            <span class="value radius">
              <input v-model="s.description" type="text"/>
               <span class="button_content">
                  <img src="@/common/img/community/vote/voteAddLine.png" :class="['pointer',index === 0?'alone':'']"
                       @click="addSelection()"
                       alt="">
                  <img src="@/common/img/community/vote/voteDeleteLine.png" class="pointer" v-if="index !== 0"
                       @click="deleteSelection(index)" alt="">
            </span>
             </span>
          </div>
        </span>
        </div>

        <div class="vote_vote_type">
          <!--          <RadioGroup v-model="formItem.voteType">-->
          <!--            <Radio class="vote_mul" :label="voteType.MULTIPLE">{{$t('MULTIPLE')}}</Radio>-->
          <!--            <Radio class="vote_single" :label="voteType.RADIO">{{$t('RADIO')}}</Radio>-->
          <!--          </RadioGroup>-->
        </div>
        <div class="vote_deadline">
          <span class="title">{{$t('start_time')}}</span>
          <span class="value radius">
          <input type="text" v-model="formItem.starttime"
                 :placeholder="$t('enter_the_date_for_example')+'2019-12-28 14:57'">
            <span class="select_date pointer">
              <div class="date_container pointer">
                <div class="month_value pointer">
                <img src="@/common/img/monitor/market/marketCalendar.png" alt="">
              </div>
              <div class="date_selector pointer">
                <DatePicker class="pointer"
                            @on-change="updateStartTime"
                            type="datetime"
                            placeholder=""
                            :value="formItem.starttime"
                            style="width: 50px"
                ></DatePicker>
              </div>
              </div>
            </span>
        </span>
        </div>

        <div class="vote_deadline">
          <span class="title">{{$t('deadline')}}</span>
          <span class="value radius">
          <input type="text" v-model="formItem.endtime"
                 :placeholder="$t('enter_the_date_for_example')+'2019-12-28 14:57'">
            <span class="select_date pointer">
              <div class="date_container pointer">
                <div class="month_value pointer">
                <img src="@/common/img/monitor/market/marketCalendar.png" alt="">
              </div>
              <div class="date_selector pointer">
                <DatePicker class="pointer" @on-change="updateCurrentMonth" type="datetime" placeholder=""
                            :value="formItem.endtime"
                            style="width: 50px"></DatePicker>
              </div>
              </div>
            </span>
        </span>
        </div>

        <!--        todo add fee after updating vote sdk-->
        <!--        <div class="vote_fee">-->
        <!--          <span class="title">{{$t('fee')}}</span>-->
        <!--          <span class="value radius">-->
        <!--          <input v-model="formItem.fee" placeholder="0.050000" type="text">-->
        <!--          <span class="right">gas</span>-->
        <!--        </span>-->
        <!--        </div>-->
        <div class="tips red right">
          {{$t('the_default_is')}}:50000gas，{{$t('the_more_you_set_the_cost_the_higher_the_processing_priority')}}
        </div>

        <div class="create_button" @click="submitCreatVote">
          {{$t('create')}}
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
    import {VoteTs} from '@/views/community/vote/VoteTs.ts'
    import "@/views/community/vote/Vote.less"

    export default class InputLock extends VoteTs {

    }
</script>

<style scoped lang="less">

</style>
