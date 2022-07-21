<template>
  <div class="border border-gray-200 p-3 mb-4 rounded">
        <div v-show="!showForm">
          <h4 class="inline-block text-2xl font-bold">{{ song.modified_name }}</h4>
          <button class="ml-1 py-1 px-2 text-sm rounded text-white bg-red-600 float-right">
              <i class="fa fa-times"></i>
          </button>
          <button class="ml-1 py-1 px-2 text-sm rounded text-white bg-blue-600 float-right"
              @click.prevent="showForm = !showForm">
              <i class="fa fa-pencil-alt"></i>
          </button>
        </div>
        <div v-show="showForm">
          <div class="text-white text-center font-bold p-4 mb-4"
            v-if="edit_show_alert" :class="edit_alert_variant" >
            {{ edit_alert_msg }}
          </div>
          <vee-form :validation-schema="editSongSchema" :initial-values="song" @submit="edit">
              <div class="mb-3">
                <label class="inline-block mb-2">Song Title</label>
                  <vee-field name="modified_name" type="text"
                    class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300
                    transition duration-500 focus:outline-none focus:border-black rounded"
                    placeholder="Enter Song Title" />
                    <ErrorMessage class="text-red-600" name="modified_name" />
              </div>
              <div class="mb-3">
                <label class="inline-block mb-2">Genre</label>
                <vee-field name="genre" type="text"
                    class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300
                    transition duration-500 focus:outline-none focus:border-black rounded"
                    placeholder="Enter Song Title" />
                    <ErrorMessage class="text-red-600" name="genre" />
              </div>
              <button :disabled="edit_in_sumbission" type="submit"
               class="py-1.5 px-3 rounded text-white bg-green-600">
              Submit
              </button>
              <button :disabled="edit_in_sumbission" @click.prevent="showForm = false" type="button"
               class="py-1.5 px-3 rounded text-white bg-gray-600">
              Go Back
              </button>
          </vee-form>
        </div>
    </div>
</template>

<script>
import { songsCollection } from '@/includes/firebase';

export default {
  name: 'CompositionItem',
  props: {
    song: {
      type: Object,
      required: true,
    },
    updateSong: {
      type: Function,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      showForm: false,
      editSongSchema: {
        modified_name: 'required',
        genre: 'alphaSpaces',
      },

      edit_in_sumbission: false,
      edit_show_alert: false,
      edit_alert_variant: 'bg-blue-500',
      edit_alert_msg: 'Please wait! Updating song info.',
    };
  },
  methods: {
    async editSong(values) {
      this.edit_show_alert = true;
      this.edit_in_sumbission = true;
      this.edit_alert_variant = 'bg-blue-500';
      this.edit_alert_msg = 'Please wait! Your account is being created.';

      console.log('You are doing great, king. Values:', values);

      try {
        await this.$store.dispatch('editSong', values);
      } catch (error) {
        this.edit_in_sumbission = false;
        this.edit_alert_variant = 'bg-red-500';
        this.edit_alert_msg = 'An unexpected error occured. Please try again later';
        console.log(error);
        return;
      }

      this.edit_alert_variant = 'bg-green-500';
      this.edit_alert_msg = 'Success!';
    },

    async edit(values) {
      console.log('You are doing great, king. Edit');
      this.edit_in_sumbission = true;
      this.edit_show_alert = true;
      this.edit_alert_variant = 'bg-blue-500';
      this.edit_alert_msg = 'Please wait! Your account is being created.';

      try {
        await songsCollection.doc(this.song.docID).update(values);
      } catch (error) {
        this.edit_in_sumbission = false;
        this.edit_alert_variant = 'bg-red-500';
        this.edit_alert_msg = 'An unexpected error occured. Please try again later';
        return;
      }

      this.updateSong(this.index, values);

      this.edit_in_sumbission = false;
      this.edit_alert_variant = 'bg-green-500';
      this.edit_alert_msg = 'Success!';
    },
  },
};
</script>